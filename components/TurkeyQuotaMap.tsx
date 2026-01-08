"use client";


import coordsRaw from "../lib/coords_tr.json";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";


import { QUOTA_ROWS } from "../lib/quotaData";
import { geocodeTurkey, haversineKm, type LatLng } from "../lib/geo";
import { fetchPopulationTR } from "../lib/population";
import SidePanel, { type SelectedPlace } from "./SidePanel";

type PlaceWithCoord = {
  province: string;
  district: string;
  quota: number;
  coord: LatLng | null;
  icon?: L.DivIcon; // ✅ icon’u bir kez üretip saklıyoruz
};

const CACHE_KEY = "tr_quota_geocode_v1";
const coords = coordsRaw as Record<string, LatLng>;

export default function TurkeyQuotaMap() {
  const [places, setPlaces] = useState<PlaceWithCoord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SelectedPlace | null>(null);

  const center = useMemo(() => ({ lat: 39.0, lon: 35.0 }), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      const cached = readCache();

      const next = await mapWithConcurrency(QUOTA_ROWS, 6, async (row) => {
        const key = cacheKey(row.province, row.district);

        const coord =
         cached[key] ??
         coords[key] ??
        (await geocodeTurkey(
        row.district === "MERKEZ"
        ? `${row.province}, Turkey`
        : `${row.district}, ${row.province}, Turkey`
       ));

        if (coord && !cached[key]) {
        cached[key] = coord;
        writeCache(cached);
       }
        // icon’u burada 1 kez üret
        const icon = quotaIcon(row.quota);

        return { ...row, coord, icon };
      });

      if (!cancelled) {
        setPlaces(next);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onPick(p: PlaceWithCoord) {
    const sourceNote =
      "Kontenjan verisi: GİB PDF ‘Hizmet Alanı / Kadro Sayısı’ tablosu.";

    // İl merkezi koordinatı (province center)
    const provinceCenterKey = cacheKey(p.province, "MERKEZ__PROVINCE_CENTER");
    const cached = readCache();

    let provinceCenter: LatLng | null = cached[provinceCenterKey] ?? null;

    if (provinceCenter === null) {
      const found = await geocodeTurkey(`${p.province}, Turkey`);
      if (found) {
        cached[provinceCenterKey] = found;
        writeCache(cached);
        provinceCenter = found;
      }
    }

    const distanceToCenterKm =
      p.coord && provinceCenter ? haversineKm(p.coord, provinceCenter) : null;

    // ✅ Paneli anında aç (nüfus daha gelmeden)
    setSelected({
      province: p.province,
      district: p.district,
      quota: p.quota,
      coord: p.coord,
      provinceCenter,
      distanceToCenterKm,
      population: null,
      populationAsOf: null,
      sourceNote
    });

    // ✅ Nüfus: arkadan dene (2 deneme)
    const trials =
      p.district === "MERKEZ"
        ? [`${p.province} ili`, p.province]
        : [`${p.district} ilçesi`, p.district];

    for (const labelTR of trials) {
      try {
        const pop = fetchPopulationTR(p.province, p.district);
        if (pop.population) {
          setSelected((prev) =>
            prev
              ? {
                  ...prev,
                  population: pop.population,
                  populationAsOf: pop.asOf
                }
              : prev
          );
          return;
        }
      } catch {
        // sessiz geç
      }
    }
  }

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <header
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 1000,
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 14,
          padding: "10px 12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
          maxWidth: "72vw"
        }}
      >
        <div style={{ fontWeight: 900 }}>Türkiye Kontenjan Haritası</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
          Marker üstündeki sayı = kontenjan. Tıklayınca detaylar açılır.
          {loading ? " (yükleniyor…)" : ""}
        </div>
      </header>

      <MapContainer
        center={[center.lat, center.lon]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places
          .filter((p) => p.coord)
          .map((p) => (
            <Marker
              key={`${p.province}-${p.district}`}
              position={[p.coord!.lat, p.coord!.lon]}
              icon={p.icon ?? quotaIcon(p.quota)}
              eventHandlers={{
                click: () => onPick(p)
              }}
            />
          ))}
      </MapContainer>

      <SidePanel selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function quotaIcon(quota: number) {
  return L.divIcon({
    className: "",
    html: `<div class="quota-badge">${quota}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
}

function cacheKey(province: string, district: string) {
  return `${province}__${district}`.toUpperCase();
}

function readCache(): Record<string, LatLng> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeCache(data: Record<string, LatLng>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, idx: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let i = 0;

  const workers = Array.from({ length: limit }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) break;
      results[idx] = await fn(items[idx], idx);
    }
  });

  await Promise.all(workers);
  return results;
}
