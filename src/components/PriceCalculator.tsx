import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';

const pricingData: Record<string, number> = {
  'Leather Sofa': 299,
  'Fabric Sofa': 399,
  'Recliner Sofa': 499,
  'L-Shape Sofa': 300, // Using 300 per seat to reach ~1500 for standard 5 seater
};

export default function PriceCalculator() {
  const [sofaType, setSofaType] = useState<string>('Fabric Sofa');
  const [seats, setSeats] = useState<number>(5);
  
  const [perSeatPrice, setPerSeatPrice] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    const price = pricingData[sofaType] || 0;
    setPerSeatPrice(price);
    
    // For L-Shape, let's enforce a minimum calculation or just straightforward per seat
    const calcSubtotal = price * seats;
    setSubtotal(calcSubtotal);
    
    // Discount logic: 10% off for 5 or more seats
    let calcDiscount = 0;
    if (seats >= 5) {
      calcDiscount = Math.round(calcSubtotal * 0.1);
    }
    setDiscount(calcDiscount);
    
    setFinalPrice(calcSubtotal - calcDiscount);
  }, [sofaType, seats]);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50 -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-brand-primary rounded-3xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col md:flex-row">
          
          {/* Controls */}
          <div className="p-10 md:w-1/2 bg-white rounded-r-3xl md:rounded-r-[3rem] relative z-10 border-r border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-brand-secondary" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-brand-primary">Price Calculator</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Sofa Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(pricingData).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSofaType(type)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium border transition-colors ${
                        sofaType === type 
                          ? 'border-brand-secondary bg-brand-secondary text-white' 
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Number of Seats: <span className="text-brand-secondary">{seats}</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  value={seats} 
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                  <span>1 Seat</span>
                  <span>15 Seats</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Output / Results */}
          <div className="p-10 md:w-1/2 text-white flex flex-col justify-center">
            <h3 className="text-xl font-poppins font-semibold mb-8 text-slate-300">Estimated Cost</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Sofa Type</span>
                <span className="font-medium text-right">{sofaType}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Total Seats</span>
                <span className="font-medium text-right">{seats}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Per Seat Price</span>
                <span className="font-medium text-right">₹{perSeatPrice}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-brand-accent">Discount (10% Off)</span>
                  <span className="font-medium text-right text-brand-accent">-₹{discount}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="text-slate-300 font-medium">Final Price</span>
              <div className="text-right">
                {discount > 0 && <span className="line-through text-slate-500 text-sm mr-2">₹{subtotal}</span>}
                <span className="text-5xl font-poppins font-bold text-white">₹{finalPrice}</span>
              </div>
            </div>
            
            <a 
              href={`https://wa.me/916283893707?text=${encodeURIComponent(`Hi KDS Sofa Care! I calculated a professional price estimate on your website calculator:\n\n• Sofa Type: ${sofaType.toUpperCase()}\n• Total Seats: ${seats}\n• Estimated Cost: ₹${finalPrice}\n\nPlease confirm availability for booking my dry cleaning treatment!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Book Service via WhatsApp
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
