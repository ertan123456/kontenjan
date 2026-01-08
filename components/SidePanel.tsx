import type { LatLng } from "../lib/geo";


export type SelectedPlace = {
  province: string;
  district: string;
  quota: number;
  coord: LatLng | null;
  provinceCenter: LatLng | null;
  distanceToCenterKm: number | null;
  population: number | null;
  populationAsOf: string | null;
  sourceNote: string;
};

export default function SidePanel({
  selected,
  onClose
}: {
  selected: SelectedPlace | null;
  onClose: () => void;
}) {
  return (
    <aside
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: 360,
        maxWidth: "92vw",
        background: "white",
        borderLeft: "1px solid #e5e7eb",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        padding: 16,
        overflow: "auto",
        zIndex: 1000
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            {selected ? `${selected.province} / ${selected.district}` : "Seçim yok"}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
            {selected?.sourceNote}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "8px 10px",
            background: "white",
            cursor: "pointer",
            height: 36
          }}
        >
          Kapat
        </button>
      </div>

      {!selected ? (
        <p style={{ marginTop: 16, color: "#374151" }}>
          Haritadaki bir sayıya tıkla.
        </p>
      ) : (
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <InfoRow label="Kontenjan" value={`${selected.quota}`} />
          <InfoRow
            label="Koordinat"
            value={
              selected.coord
                ? `${selected.coord.lat.toFixed(5)}, ${selected.coord.lon.toFixed(5)}`
                : "Bulunamadı"
            }
          />
          <InfoRow
            label="İl merkezine uzaklık"
            value={
              selected.distanceToCenterKm == null
                ? "Hesaplanamadı"
                : `${selected.distanceToCenterKm.toFixed(1)} km`
            }
          />
          <InfoRow
            label="Nüfus (Wikidata)"
            value={
              selected.population == null
                ? "Bulunamadı"
                : `${selected.population.toLocaleString("tr-TR")}${
                    selected.populationAsOf ? ` (tarih: ${selected.populationAsOf})` : ""
                  }`
            }
          />

          <div
            style={{
              marginTop: 8,
              padding: 10,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              fontSize: 12,
              color: "#374151"
            }}
          >
            Not: Konumlar OpenStreetMap Nominatim ile bulunur ve tarayıcında cache’lenir.
          </div>
        </div>
      )}
    </aside>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 12
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{value}</div>
    </div>
  );
}
