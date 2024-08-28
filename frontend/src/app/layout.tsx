"use client";

import { RecoilRoot } from 'recoil';
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation';
import "./styles/globals.css";
import HeaderHlive from './components/HeaderHlive';
import Footer from './components/Footer';
import FourStageProgressBar from './components/4StageProgressBar';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showProgressBar = ['/model', '/dealership', '/schedule', '/contact'].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <HeaderHlive />
          {showProgressBar && <FourStageProgressBar />}
          <main className="flex-grow p-8">
            {children}
          </main>
          <Footer />
        </RecoilRoot>
      </body>
    </html>
  );
}
