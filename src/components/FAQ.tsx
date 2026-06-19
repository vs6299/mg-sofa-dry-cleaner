import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does sofa cleaning take?',
    a: 'A standard 5-seater sofa takes about 1.5 to 2 hours to deep clean completely, depending on the fabric and level of stains.'
  },
  {
    q: 'How long does drying take?',
    a: 'Using our advanced extraction methods, the sofa is usually touch-dry instantly. Complete drying takes about 2 to 4 hours under normal fan ventilation.'
  },
  {
    q: 'Are chemicals safe for kids and pets?',
    a: 'Yes, we exclusively use premium, eco-friendly, non-toxic, and hypoallergenic cleaning agents that are 100% safe for your family and pets.'
  },
  {
    q: 'Do you provide doorstep service?',
    a: 'Yes, we provide 100% doorstep service. Our team will come to your home or office fully equipped with machines and solutions.'
  },
  {
    q: 'How often should sofas be cleaned?',
    a: 'We recommend deep professional cleaning every 6 months to maintain hygiene, remove embedded allergens, and prolong the life of the fabric.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary mt-4 mb-4">
            Common Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-200"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between font-poppins font-semibold text-brand-primary focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-slate-600 border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
