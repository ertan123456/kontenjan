import dynamic from "next/dynamic";

const TurkeyQuotaMap = dynamic(
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
