import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Stylish Game Name - Fancy Text Generator for PUBG, Free Fire & BGMI',
  description: 'Generate unique and stylish gamer tags with our clean and premium fancy text engine. Optimized symbols for PUBG, Free Fire, BGMI, COD, and Roblox. 100% stable Unicode compatibility.',
  keywords: 'fancy text, gamer tags, stylish names, PUBG names, Free Fire nicknames, BGMI font, COD mobile names, Roblox symbols, Minecraft names',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
