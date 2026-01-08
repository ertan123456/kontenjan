import raw from "./population_tr.json";

type PopOut = { population: number | null; asOf: string | null };

type PopulationTR = Record<
  string,
  {
    population: number;
    districts?: Record<string, number>;
  }
>;

// ✅ JSON’u Record<string, ...> olarak “genelle”
const populationData = raw as unknown as PopulationTR;

export function fetchPopulationTR(province: string, district: string): PopOut {
  const prov = populationData[province];
  if (!prov) return { population: null, asOf: null };

  if (district === "MERKEZ") {
    return { population: prov.population, asOf: "2023" };
  }

  const distPop = prov.districts?.[district];
  if (!distPop) return { population: null, asOf: null };

  return { population: distPop, asOf: "2023" };
}