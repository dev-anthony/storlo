
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import {Market} from "@/components/market";
import {CTA} from "@/components/cta";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <Hero />
      <Market />
      <CTA />
      <Footer />
    </main>
  );
}
