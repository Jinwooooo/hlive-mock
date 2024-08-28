"use client"

import HeaderLiveConsultation from './components/HeaderLiveConsultation';
import HeaderHlive from './components/HeaderHlive';
import Footer from './components/Footer';
import Model from './pages/model';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <HeaderHlive />
        {/* <HeaderHlive /> */}
        <main className="flex-grow p-8">
            <Model />
        </main>
        <Footer />
    </div>
  );
}
