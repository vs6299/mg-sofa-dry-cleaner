import { motion } from 'motion/react';
import { Armchair, ShieldCheck, Sparkles, Wind, Droplets } from 'lucide-react';

const services = [
  { name: 'Sofa Dry Cleaning', icon: Armchair, desc: 'Professional moisture-free deep cleaning' },
  { name: 'Fabric Sofa Cleaning', icon: Sparkles, desc: 'Gentle stain removal for delicate fabrics' },
  { name: 'Leather Sofa Cleaning', icon: ShieldCheck, desc: 'Safe conditioning & polishing for leather' },
  { name: 'L-Shape Sofa Cleaning', icon: Armchair, desc: 'Comprehensive cleaning for large sectionals' },
  { name: 'Recliner Sofa Cleaning', icon: Armchair, desc: 'Detailed mechanism and fabric cleaning' },
  { name: 'Sofa Shampooing', icon: Droplets, desc: 'Deep extraction foaming treatment' },
  { name: 'Sofa Stain Removal', icon: Sparkles, desc: 'Targeted tough stain elimination entirely' },
  { name: 'Sofa Sanitization', icon: ShieldCheck, desc: 'Anti-bacterial coating & hygiene check' },
  { name: 'Dust Removal', icon: Wind, desc: 'High-power industrial vacuuming' },
  { name: 'Odor Removal', icon: Wind, desc: 'Deodorizing treatments for fresh smells' },
  { name: 'Deep Sofa Cleaning', icon: Sparkles, desc: 'Multi-step extensive dirt extraction' },
  { name: 'Home & Office', icon: Armchair, desc: 'Corporate and residential bulk cleaning' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary mt-4 mb-6">
            Specialized Sofa Cleaning Solutions
          </h2>
          <p className="text-slate-600 text-lg">
            We focus strictly on sofas. Our specialized approach ensures the highest quality outcome for your valuable furniture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-brand-secondary/30 hover:shadow-xl hover:shadow-brand-secondary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-secondary transition-all duration-300">
                <service.icon className="w-7 h-7 text-brand-secondary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-brand-primary mb-2">
                {service.name}
              </h3>
              <p className="text-slate-500">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
