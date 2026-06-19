import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import BeforeAfter from './components/BeforeAfter';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import PriceCalculator from './components/PriceCalculator';
import SpecialOffer from './components/SpecialOffer';
import Reviews from './components/Reviews';
import ServiceAreas from './components/ServiceAreas';
import BookingForm from './components/BookingForm';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-secondary/20 selection:text-brand-primary">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <BeforeAfter />
        <HowItWorks />
        <Pricing />
        <SpecialOffer />
        <PriceCalculator />
        <Reviews />
        <ServiceAreas />
        <BookingForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
