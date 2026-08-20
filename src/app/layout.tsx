import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google';
import './globals.css';

const rajdhani = Rajdhani({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
});

export const metadata: Metadata = {
  title: 'Monster Energy | The Forge',
  description: 'Premium Scrollytelling Promotional Site for Monster Energy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rajdhani.className}>{children}</body>
    </html>
  );
}
