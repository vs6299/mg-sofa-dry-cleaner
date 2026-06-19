import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Leather Sofa Cleaning',
    price: '₹299',
    unit: 'Per Seat',
    features: [
      'Dust Removal',
      'Stain Treatment',
      'Deep Cleaning',
      'Sanitization',
      'Quick Dry Process',
    ],
  },
  {
    name: 'Fabric Sofa Cleaning',
    price: '₹399',
    unit: 'Per Seat',
    featured: true,
    features: [
      'Deep Shampoo Cleaning',
      'Stain Removal',
      'Germ Protection',
      'Odor Removal',
      'Sanitization',
    ],
  },
  {
    name: 'L-Shape Sofa Cleaning',
    price: '₹1499',
    unit: 'Starting From',
    features: [
      'Complete Deep Cleaning',
      'Shampoo Wash',
      'Stain Treatment',
      'Sanitization',
      'Premium Care',
    ],
  },
  {
    name: 'Recliner Sofa Cleaning',
    price: '₹499',
    unit: 'Per Seat',
    features: [
      'Deep Cleaning',
      'Dust Removal',
      'Sanitization',
      'Odor Removal',
      'Premium Care',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">Packages</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary mt-4 mb-6">
            Affordable Sofa Cleaning Packages
          </h2>
          <p className="text-slate-600 text-lg">
            Professional Sofa Cleaning at Transparent Prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border hover:shadow-xl transition-shadow flex flex-col ${
                plan.featured ? 'border-brand-secondary ring-1 ring-brand-secondary shadow-lg' : 'border-slate-100 shadow-sm'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-poppins font-bold text-brand-primary mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-poppins font-bold text-brand-primary">{plan.price}</span>
                <span className="text-slate-500 font-medium ml-2">{plan.unit}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="bg-brand-accent/10 p-1 rounded-full shrink-0">
                      <Check className="w-4 h-4 text-brand-accent" />
                    </div>
                    <span className="text-slate-600 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={`https://wa.me/916283893707?text=${encodeURIComponent(`Hi KDS Sofa Care! I am looking to book the "${plan.name}" package (${plan.price} ${plan.unit}) advertised on your website. Please schedule a dry cleaning appointment!`)}`}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-4 rounded-xl font-semibold text-center transition-colors shadow-sm cursor-pointer ${
                  plan.featured
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/25'
                    : 'bg-slate-100 text-brand-primary hover:bg-slate-200'
                }`}
              >
                Book on WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
