import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stylish Glyph - Fancy Text Generator for PUBG, Free Fire & BGMI',
  description: 'Create unique and stylish gamer tags with our fancy text generator. AI-powered alias suggestions for PUBG, Free Fire, BGMI, COD, and Roblox.',
  keywords: 'fancy text, gamer tags, stylish names, PUBG names, Free Fire nicknames, BGMI font, COD mobile names, Roblox symbols',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
