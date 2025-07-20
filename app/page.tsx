import LandingNavbar from "@/components/navbars/LandingNavbar";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="custom-gradient">
        <LandingNavbar/>
        <section>
            <div className="flex flex-row justify-center max-md:px-15 max-sm:px-10 px-15">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="font-semibold font-bold xl:text-7xl lg:text-6xl text-5xl uppercase">Zbuduj swój wymarzony zestaw</h1>
                        <h2 className="font-semibold font-bold xl:text-5xl  lg:text-4xl text-3xl  opacity-75 mb-10">sprawdz kompatybilność i najniższe
                            ceny</h2>
                        <button className="btn-hero"><Link
                            href="/konfiguracja/nowa">Zacznij Tworzyć</Link></button>
                    </div>
                    <div className="relative">
                        <Image src="/computer-preview.png" alt="computer" width={800} height={800}
                                className="object-cover  object-center"/>
                    </div>
                </div>
            </div>
        </section>
    </div>



  );
}
