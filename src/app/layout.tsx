import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Stylish Game Name 2026 - Free Fire & PUBG Name Maker',
  description: 'The ultimate Stylish Game Name Generator 2026. Create fancy gaming names with our Free Fire Name Maker and PUBG Name Maker. 100% stable for BGMI, COD, and Roblox.',
  keywords: 'Stylish Game Name 2026, Free Fire Name Maker, PUBG Name Maker, BGMI Name Generator, Fancy Gaming Name, Gaming Name Generator 2026, Stylish Name for Free Fire, PUBG Stylish Name, Cool Gaming Names, BGMI Stylish Nickname',
  openGraph: {
    title: 'Stylish Game Name 2026 - Ultimate Gaming Name Generator',
    description: 'The world\'s most stable Fancy Gaming Name generator for Free Fire, PUBG, and BGMI in 2026.',
    url: 'https://stylishgamename.com',
    siteName: 'Stylish Game Name',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // FAQPage and HowTo Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": "How to Create a Stylish Game Name 2026",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Enter your gaming nickname in the Tactical Input field."
          },
          {
            "@type": "HowToStep",
            "text": "Choose a Left Symbol for your identity prefix."
          },
          {
            "@type": "HowToStep",
            "text": "Select a Right Symbol for your identity suffix."
          },
          {
            "@type": "HowToStep",
            "text": "Choose a Font Style from the Tactical Font Forge 2026."
          },
          {
            "@type": "HowToStep",
            "text": "Copy your generated name from the Live Preview dock or download as PNG."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to use this Free Fire Name Maker 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply enter your name, select your desired symbols and fonts, and click copy. It works perfectly for Free Fire and Free Fire MAX 2026 editions."
            }
          },
          {
            "@type": "Question",
            "name": "Is this PUBG Name Maker compatible with BGMI 3.5?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our generator uses high-stability Unicode characters specifically tested for BGMI 3.5 and PUBG Mobile compatibility."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-white text-foreground antialiased selection:bg-[#25D366]/20 selection:text-[#25D366]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
