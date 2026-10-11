import type { Metadata, Viewport } from "next";
import PhoneFrame from "@/components/PhoneFrame";
import "./globals.css";

export const metadata: Metadata = {
  title: "Core — custom designs for groups",
  description: "Your group chat designs it. Arcade makes it.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PhoneFrame>{children}</PhoneFrame>
      </body>
    </html>
  );
}
