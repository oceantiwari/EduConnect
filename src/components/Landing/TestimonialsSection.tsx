import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  sectionsRef: React.MutableRefObject<HTMLElement[]>;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ sectionsRef }) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "KidSafe gives me complete peace of mind. I know exactly when Emma reaches school safely every day.",
    },
    {
      name: "Mr. David Smith",
      role: "Teacher",
      image:
        "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "The platform makes communication with parents seamless. I can share praise and address concerns instantly.",
    },
    {
      name: "Dr. Emily Clark",
      role: "Principal",
      image:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "KidSafe has transformed how we manage our school. Everything is organized, transparent, and efficient.",
    },
  ];

  return (
    <section
      className="py-20 opacity-0 transition-all duration-700"
      ref={(el) => el && sectionsRef.current.push(el)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Families & Schools
          </h2>
          <p className="text-xl text-gray-600">
            See what our community has to say about KidSafe
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
