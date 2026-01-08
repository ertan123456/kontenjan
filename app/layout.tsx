import "./global.css";

export const metadata = {
  title: "Türkiye Kontenjan Haritası",
  description: "PDF tablosundaki il/ilçe kontenjanlarını haritada gösterir."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
