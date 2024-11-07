import Header from '@/components/frame/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NFT Minting Assistant',
  description: 'Mint NFTs using voice or text commands',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} dark:bg-[url("/icons/shared/background.svg")] bg-[url("/images/shared/light-background.jfif")]`}
      >
        <Header />
        <div className='pt-20 container mx-auto'>{children}</div>
      </body>
    </html>
  );
}
