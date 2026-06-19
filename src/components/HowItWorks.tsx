import { motion } from 'motion/react';

const steps = [
  { id: '01', title: 'Book Service', desc: 'Schedule a visit easily via call or form.' },
  { id: '02', title: 'Inspection', desc: 'Our team analyzes fabric type & stains.' },
  { id: '03', title: 'Deep Cleaning', desc: 'Vacuum & shampoo using premium chemicals.' },
  { id: '04', title: 'Sanitization', desc: 'Germ elimination & odor treatment.' },
  { id: '05', title: 'Final Quality Check', desc: 'Detailed inspection to ensure perfection.' },
  { id: '06', title: 'Customer Approval', desc: 'Review the work and give your satisfaction.' },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">Working Process</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary mt-4 mb-6">
            How It Works
          </h2>
          <p className="text-slate-600 text-lg">
            A transparent and professional step-by-step cleaning process designed for maximum effectiveness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Timeline Connector Line */}
          <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-1 bg-slate-100 -z-10 rounded-full"></div>
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100"
            >
              <div className="w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center text-2xl font-poppins font-bold shadow-lg mb-6 shadow-brand-primary/20">
                {step.id}
              </div>
              <h3 className="text-xl font-poppins font-bold text-brand-primary mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
