import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, Sofa } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#process' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 z-50 group">
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-tr from-brand-secondary to-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sofa className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full"></div>
            </div>
          </div>
          <div className={cn("hidden sm:flex flex-col", isScrolled ? "text-brand-primary" : "text-white")}>
            <div className="flex items-center gap-1.5">
              <span className="font-poppins font-black text-xl tracking-tight leading-none bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-cyan-500 transition-all">KDS</span>
              <span className="font-poppins font-black text-xl tracking-tight leading-none">Sofa Care</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1">Premium Dry Cleaning</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-secondary",
                isScrolled ? "text-slate-600" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+916283893707"
            className="flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-secondary transition-colors"
          >
            <span className={cn("p-2 rounded-full", isScrolled ? "bg-slate-100" : "bg-white/20 text-white")}>
              <Phone className="w-4 h-4" />
            </span>
            <span className={isScrolled ? "text-brand-primary" : "text-white"}>+91 6283893707</span>
          </a>
          <a
            href="tel:+916283893707"
            className="bg-brand-secondary text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
          >
            Call Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn("lg:hidden p-2 z-50", isScrolled || isMobileMenuOpen ? "text-brand-primary" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-white shadow-xl h-screen flex flex-col pt-24 px-6 pb-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-poppins font-semibold text-brand-primary"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <a
                href="tel:+916283893707"
                className="flex items-center justify-center gap-2 bg-slate-100 text-brand-primary py-4 rounded-xl font-semibold"
              >
                <Phone className="w-5 h-5" />
                +91 6283893707
              </a>
              <a
                href="https://wa.me/916283893707"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Message
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
