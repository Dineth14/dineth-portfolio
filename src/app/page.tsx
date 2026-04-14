import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ResearchSection from '@/components/sections/ResearchSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import HonorsSection from '@/components/sections/HonorsSection';
import BeyondSection from '@/components/sections/BeyondSection';
import ContactSection from '@/components/sections/ContactSection';
import PhotoSlideshow from '@/components/sections/PhotoSlideshow';
import NoiseBackground from '@/components/ui/NoiseBackground';
import LoadingScreen from '@/components/ui/LoadingScreen';
import GlobalParticles from '@/components/ui/GlobalParticles';
import CustomCursor from '@/components/ui/CustomCursor';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <NoiseBackground />
      <GlobalParticles />
      <CustomCursor />
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <ProjectsSection />
        <HonorsSection />
        <BeyondSection />
        <PhotoSlideshow />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
