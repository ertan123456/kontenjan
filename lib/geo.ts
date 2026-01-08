export type LatLng = { lat: number; lon: number };

const NOMINATIM = "https://nominatim.openstreetmap.org/search";

export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export async function geocodeTurkey(query: string): Promise<LatLng | null> {
  const url = `${NOMINATIM}?format=json&limit=1&countrycodes=tr&q=${encodeURIComponent(
    query
  )}`;

  // Nominatim kullanımına saygı: küçük bir User-Agent header'ı iyi olur
  const res = await fetch(url, {
    headers: {
      "Accept": "application/json"
    }
  });

  if (!res.ok) return null;

  const data = (await res.json()) as Array<{ lat: string; lon: string }>;
  if (!data?.length) return null;

  return { lat: Number(data[0].lat), lon: Number(data[0].lon) };
}
