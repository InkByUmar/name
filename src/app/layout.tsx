import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Stylish Game Name - Free Fire & PUBG Name Generator',
  description: 'Generate the ultimate Stylish Game Name with our Free Fire Name Maker and PUBG Name Maker. Create fancy gaming names for BGMI, COD, and Roblox. 100% stable Unicode symbols.',
  keywords: 'Stylish Game Name, Free Fire Name Maker, PUBG Name Maker, BGMI Name Generator, Fancy Gaming Name, Gaming Name Generator, Stylish Name for Free Fire, PUBG Stylish Name, Cool Gaming Names',
  openGraph: {
    title: 'Stylish Game Name - Ultimate Gaming Name Generator',
    description: 'The world\'s most stable Fancy Gaming Name generator for Free Fire, PUBG, and BGMI.',
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
        "name": "How to Create a Stylish Game Name",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Enter your gaming nickname in the input field."
          },
          {
            "@type": "HowToStep",
            "text": "Choose a Left Symbol for your prefix."
          },
          {
            "@type": "HowToStep",
            "text": "Select a Right Symbol for your suffix."
          },
          {
            "@type": "HowToStep",
            "text": "Choose a Font Style from the Tactical Font Forge."
          },
          {
            "@type": "HowToStep",
            "text": "Copy your generated name from the Live Preview dock."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to use this Free Fire Name Maker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply enter your name, select your desired symbols and fonts, and click copy. It works perfectly for Free Fire and Free Fire MAX."
            }
          },
          {
            "@type": "Question",
            "name": "Is this PUBG Name Maker compatible with BGMI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our generator uses high-stability Unicode characters specifically tested for BGMI and PUBG Mobile compatibility."
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
