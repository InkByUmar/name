import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Stylish Game Name - Fancy Text Generator for PUBG, Free Fire & BGMI',
  description: 'Generate unique, stylish, and cool gamer tags with our clean White & Green fancy text engine. 100% stable Unicode compatibility for PUBG, Free Fire, BGMI, COD, and Roblox. No question marks!',
  keywords: 'fancy text, gamer tags, stylish names, PUBG names, Free Fire nicknames, BGMI font, COD mobile names, Roblox symbols, Minecraft names, stylish game name generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-white text-foreground antialiased selection:bg-[#25D366]/20 selection:text-[#25D366]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
