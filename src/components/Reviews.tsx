import { motion } from 'motion/react';

const reviews = [
  { text: "Amazing service. Sofa looks brand new. The team came exactly on time and worked very professionally.", author: "Rahul Sharma", rating: 5 },
  { text: "Very professional team and quick service. They removed tough pen marks and tea stains completely.", author: "Priya Singh", rating: 5 },
  { text: "Affordable and highly recommended. Better than any previous local cleaner I've hired.", author: "Vikram Mehta", rating: 5 },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary mt-4 mb-6">
            Customer Reviews
          </h2>
          <p className="text-slate-600 text-lg">
            Don't just take our word for it. Here's what our satisfied customers have to say about our sofa dry cleaning services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-slate-700 text-lg mb-8 italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-brand-primary">{review.author}</h4>
                  <span className="text-sm text-slate-500">Verified Customer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
