import { NextResponse } from "next/server";

type Out = { population: number | null; asOf: string | null };

// basit memory cache
const mem = new Map<string, Out>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const label = (searchParams.get("label") || "").trim();

  if (!label) return NextResponse.json({ population: null, asOf: null });

  const key = label.toLowerCase();
  const hit = mem.get(key);
  if (hit) return NextResponse.json(hit);

  const sparql = `
SELECT ?population ?time WHERE {
  ?item wdt:P17 wd:Q43 .
  ?item rdfs:label ?lbl .
  FILTER(lang(?lbl) = "tr") .
  FILTER(CONTAINS(LCASE(STR(?lbl)), LCASE("${escapeSparql(label)}"))) .

  OPTIONAL {
    ?item p:P1082 ?popStatement .
    ?popStatement ps:P1082 ?population .
    OPTIONAL { ?popStatement pq:P585 ?time . }
  }
}
ORDER BY DESC(?time) DESC(?population)
LIMIT 1
`.trim();

  const url =
    "https://query.wikidata.org/sparql?format=json&query=" +
    encodeURIComponent(sparql);

  try {
    const r = await fetch(url, {
      headers: {
        Accept: "application/sparql-results+json",
        // Server-side’da bunu koyabiliyoruz
        "User-Agent": "turkiye-kontenjan-harita/1.0 (local)"
      },
      // Next cache
      cache: "force-cache"
    });

    if (!r.ok) {
      const out: Out = { population: null, asOf: null };
      mem.set(key, out);
      return NextResponse.json(out);
    }

    const json = await r.json();
    const b = json?.results?.bindings?.[0];

    const popStr = b?.population?.value ?? null;
    const timeStr = b?.time?.value ?? null;

    const out: Out = {
      population: popStr ? Number(popStr) : null,
      asOf: timeStr ? String(timeStr).slice(0, 10) : null
    };

    mem.set(key, out);
    return NextResponse.json(out);
  } catch {
    const out: Out = { population: null, asOf: null };
    mem.set(key, out);
    return NextResponse.json(out);
  }
}

function escapeSparql(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
