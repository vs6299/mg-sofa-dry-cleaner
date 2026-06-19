import { Phone, MessageCircle, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
        href="tel:+916283893707"
        className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-500/30 flex items-center justify-center hover:bg-blue-700 transition-colors"
        aria-label="Call Now"
      >
        <Phone className="w-5 h-5" />
      </motion.a>
      
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        href="https://wa.me/916283893707"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center hover:bg-green-600 transition-colors relative group"
        aria-label="WhatsApp Us"
      >
        <span className="absolute -inset-1 rounded-full bg-green-500/20 blur animate-pulse"></span>
        <MessageCircle className="w-7 h-7 relative z-10" />
      </motion.a>
    </div>
  );
}
