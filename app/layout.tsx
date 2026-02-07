import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "IZI - Website KKN",
  description: "Website Edukasi Zakat & Keuangan Keluarga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
