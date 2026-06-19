import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary mt-4 mb-6">
            Contact Us
          </h2>
          <p className="text-slate-600 text-lg">
            We're here to answer any questions and schedule your professional sofa cleaning service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Contact Details */}
          <div className="p-10 lg:p-12">
            <h3 className="text-2xl font-poppins font-bold text-brand-primary mb-8">Contact Information</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-brand-secondary/10 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Phone Number</h4>
                  <a href="tel:+916283893707" className="text-slate-600 hover:text-brand-secondary transition-colors text-lg">+91 6283893707</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">WhatsApp Chat</h4>
                  <a href="https://wa.me/916283893707" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-green-500 transition-colors text-lg">Message on WhatsApp</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-500/10 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Service Area</h4>
                  <p className="text-slate-600 text-lg">Tricity, Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, Derabassi</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/10 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Working Hours</h4>
                  <p className="text-slate-600 text-lg">24 X 7 (Open Always)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a href="tel:+916283893707" className="flex-1 bg-brand-secondary text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a href="https://wa.me/916283893707" target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="relative min-h-[400px] lg:min-h-full">
            <iframe 
               src="https://maps.google.com/maps?q=Maloya,%20Chandigarh&t=&z=14&ie=UTF8&iwloc=&output=embed" 
               className="absolute inset-0 w-full h-full border-0"
               allowFullScreen={false} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
