import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-serif-jp"
});

export const metadata: Metadata = {
  title: "グンチーン教団 公式ホームページ",
  description: "すべては、グングン良くなる。架空のギャグコンテンツとして制作されたグンチーン教団の公式サイトです。",
  keywords: ["グンチーン教団", "グン様", "架空サイト", "エンターテインメント"],
  openGraph: {
    title: "グンチーン教団 公式ホームページ",
    description: "世界一真面目にふざけた宗教サイト。",
    type: "website",
    locale: "ja_JP"
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSerifJp.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
