import { Loader } from "@/components/loader";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CraftGallery } from "@/components/sections/craft-gallery";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <CraftGallery />
        <Projects />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
