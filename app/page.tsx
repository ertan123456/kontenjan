export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";

const TurkeyQuotaMap = dynamicImport(
  () => import("../components/TurkeyQuotaMap").then((m) => m.default),
  { ssr: false }
);

export default function Page() {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <TurkeyQuotaMap />
    </main>
  );
}
