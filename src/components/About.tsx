import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional cleaning team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-poppins font-bold text-brand-secondary">10K+</p>
              <p className="text-slate-600 font-medium">Sofas Cleaned</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">About Company</span>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-brand-primary mt-4 mb-6">
              Restoring Comfort & Hygiene To Your Living Spaces
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              <span className="font-bold text-brand-primary">KDS Sofa Care</span> provides professional doorstep sofa cleaning services using modern equipment and eco-friendly cleaning solutions. We help restore freshness, hygiene and comfort to your sofas with deep cleaning technology.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Customer" className="w-full h-full object-cover"/>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-amber-400">
                  {'★★★★★'}
                </div>
                <span className="font-medium text-slate-800">Trusted by 5000+ Customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
