import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GastoClaro",
  description: "Control inteligente de tus gastos personales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
