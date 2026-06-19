import { motion } from 'motion/react';
import { Tag, Sparkles } from 'lucide-react';

export default function SpecialOffer() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-brand-primary to-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 p-8 md:p-12"
        >
          {/* Decor */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-secondary/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 font-semibold text-brand-accent tracking-wide uppercase text-sm">
                <Tag className="w-4 h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
                Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-blue-400">10% OFF</span> on Cleaning of 5 Seats or More
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-4 text-lg font-medium text-slate-300">
                <span className="h-px w-8 bg-slate-600"></span>
                <span className="italic text-slate-400 font-serif">OR</span>
                <span className="h-px w-8 bg-slate-600"></span>
              </div>
              <h3 className="text-xl md:text-2xl font-poppins font-semibold mt-4 text-white flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Free Sanitization with Every Sofa Cleaning Booking
              </h3>
            </div>
            
            <div className="shrink-0">
              <a 
                href={`https://wa.me/916283893707?text=${encodeURIComponent(`Hi KDS Sofa Care! I want to claim your premium Limited Time Offer advertised on your website:\n\n✨ 10% OFF on 5+ Seats OR Free Sanitization with my booking!\n\nPlease register my appointment.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg whitespace-nowrap cursor-pointer"
              >
                Claim Offer on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
