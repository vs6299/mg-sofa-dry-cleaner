import { motion } from 'motion/react';
import { MapPin, CheckCircle2 } from 'lucide-react';

const areas = [
  'Tricity',
  'Chandigarh',
  'Mohali',
  'Panchkula',
  'Zirakpur',
  'Kharar',
  'Derabassi'
];

export default function ServiceAreas() {
  return (
    <section className="py-20 bg-brand-primary text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-accent font-semibold tracking-wider uppercase text-sm">Where We Serve</span>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mt-4 mb-6">
              Our Service Areas
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              We provide prompt and professional doorstep sofa dry cleaning services across the Tri-city and surrounding regions. We come to you fully equipped.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {areas.map((area, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white/10 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-brand-secondary" />
                <span className="font-poppins font-semibold text-lg">{area}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-brand-accent opacity-50" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
