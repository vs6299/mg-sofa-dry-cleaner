import { Phone, Mail, MapPin, Sofa } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-primary pt-20 pb-10 text-slate-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-gradient-to-tr from-brand-secondary to-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Sofa className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-white">
                <div className="flex items-center gap-1.5">
                  <span className="font-poppins font-black text-xl tracking-tight leading-none bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">KDS</span>
                  <span className="font-poppins font-black text-xl tracking-tight leading-none text-white">Sofa Care</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1.5">Premium Dry Cleaning</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The leading professional sofa dry cleaning specialists in the Tri-city area. We bring freshness back to your furniture with advanced cleaning technology.
            </p>
          </div>

          <div>
            <h4 className="text-white font-poppins font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-brand-secondary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-secondary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-secondary transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-brand-secondary transition-colors">How it Works</a></li>
              <li><a href="#reviews" className="hover:text-brand-secondary transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-poppins font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>Fabric Sofa Cleaning</li>
              <li>Leather Sofa Cleaning</li>
              <li>Sofa Shampooing</li>
              <li>Stain & Odor Removal</li>
              <li>L-Shape Sofa Cleaning</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-poppins font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-secondary shrink-0" />
                <div>
                  <a href="tel:+916283893707" className="hover:text-white transition-colors">+91 6283893707</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-secondary shrink-0" />
                <a href="mailto:sidvir03@gmail.com" className="hover:text-white transition-colors">sidvir03@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>Tricity, Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, Derabassi</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} KDS Sofa Care. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
