import { motion } from 'motion/react';
import { Phone, CheckCircle2 } from 'lucide-react';

const trustBadges = [
  'Doorstep Service',
  'Same Day Service',
  'Safe Chemicals',
  'Trained Professionals',
  'Quick Dry Technology'
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=2070"
          alt="Clean modern living room sofa"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 via-brand-primary/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold mb-6">
              #1 Sofa Cleaning Experts
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins text-white font-bold leading-tight mb-6">
              Professional Sofa Dry Cleaning Service <span className="text-brand-secondary">At Your Doorstep</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
              Remove Dust, Stains, Germs & Bad Odors. Make Your Sofa Look Fresh, Clean & Hygienic.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="https://wa.me/916283893707"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25"
            >
              WhatsApp Chat
            </a>
            <a
              href="tel:+916283893707"
              className="bg-white text-brand-primary px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call +91 6283893707
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
