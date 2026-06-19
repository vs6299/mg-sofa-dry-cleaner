import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: any) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const position = ((x - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100)); // Clamp between 0-100
  };

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">Visible Results</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary mt-4 mb-6">
            Before & After Comparison
          </h2>
          <p className="text-slate-600 text-lg">
            See the remarkable difference our deep cleaning process makes to dirty, stained, and dusty sofas.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div 
            ref={containerRef}
            className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize bg-slate-200"
            onMouseDown={handleMouseDown}
            onTouchMove={handleMove}
          >
            {/* After Image (Clean) - Bottom Layer */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200" 
                alt="Clean Sofa" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute top-4 right-4 bg-brand-secondary text-white px-4 py-1 rounded-full font-semibold text-sm shadow-lg">
                After
              </div>
            </div>

            {/* Before Image (Dirty - simulated with sepia/contrast filters for demo since we don't have exactly matched before/after photos) */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200" 
                alt="Dirty Sofa" 
                className="w-full h-full object-cover select-none pointer-events-none sepia contrast-75 brightness-75 blur-[1px]"
                style={{ width: `${(100 / sliderPosition) * 100}%`, maxWidth: 'none' }}
              />
              <div className="absolute top-4 left-4 bg-slate-800 text-white px-4 py-1 rounded-full font-semibold text-sm shadow-lg">
                Before
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                  <path d="M15 18l-6-6 6-6" /><path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 font-medium text-slate-600 text-sm">Dirty Sofa → Clean Sofa</span>
            <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 font-medium text-slate-600 text-sm hidden sm:block">Stained Sofa → Fresh Sofa</span>
            <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 font-medium text-slate-600 text-sm hidden md:block">Dusty Sofa → Sanitized Sofa</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
