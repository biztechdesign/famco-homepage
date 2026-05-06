import type { Metadata } from "next";
import "./globals.css";
import ThemePicker from "@/components/ThemePicker";

export const metadata: Metadata = {
  title: "FAMCO Used Equipment — Trucks, Buses, Machinery in the UAE",
  description:
    "Buy used Volvo trucks, buses, construction equipment and forklifts from FAMCO, the sole Volvo distributor in the UAE since 1978.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Asta+Sans:wght@500;600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Flaticon Uicons — regular rounded */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
      </head>
      <body>
        {children}
        <ThemePicker />
      </body>
    </html>
  );
}
