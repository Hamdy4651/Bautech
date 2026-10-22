import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Ratgeber from '@/components/Ratgeber';
import BeforeAfter from '@/components/BeforeAfter';
import Gallery from '@/components/Gallery';
import Stats from '@/components/Stats';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import CTABand from '@/components/CTABand';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Services />
        <Ratgeber />
        <BeforeAfter />
        <Gallery />
        <Stats />
        <WhyUs />
        <Process />
        <Testimonials />
        <CTABand />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
