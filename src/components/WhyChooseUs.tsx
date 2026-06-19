import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const reasons = [
  'Doorstep Service',
  'Experienced Team',
  'Modern Cleaning Machines',
  'Eco-Friendly Chemicals',
  'Affordable Pricing',
  'Same Day Service',
  'Deep Cleaning Technology',
  'Quick Dry Process',
  'Customer Satisfaction',
  'Professional Service'
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-brand-primary text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">
              Why Trust <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">KDS Sofa Care</span>?
            </h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-xl">
              We stand out by delivering unparalleled service quality, utilizing modern technology, and respecting your time and home. Experience the premium standard in sofa care.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-brand-secondary/20 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <span className="font-medium text-slate-200">{reason}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <a href="tel:+916283893707" className="inline-flex items-center gap-2 bg-brand-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                Call For Consultation
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1000" 
                alt="Expert sofa cleaner working" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay card */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 p-6 bg-white rounded-2xl shadow-2xl hidden md:block max-w-[200px]">
              <div className="text-brand-accent mb-2">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <h4 className="text-brand-primary font-bold text-lg font-poppins">100% Quality Assurance</h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
