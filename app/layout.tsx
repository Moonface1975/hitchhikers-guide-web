import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "The Hitchhiker's Guide to the Galaxy | Solid Gold Edition";
const description = "Play Douglas Adams and Steve Meretzky's 1984 interactive novel in a modern browser edition, with the complete original story intact.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "The Hitchhiker's Guide to the Galaxy",
  keywords: ["interactive fiction", "Hitchhiker's Guide to the Galaxy", "Infocom", "Douglas Adams", "text adventure"],
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
