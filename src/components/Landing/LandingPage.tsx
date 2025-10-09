import React, { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Shield,
  Users,
  MessageSquare,
  BarChart3,
  ShoppingBag,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Bell,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const increment = end / (duration / 16); // ~60fps
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observerRef.current?.observe(section);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: Shield,
      title: "Safe Attendance Tracking",
      description:
        "Parents mark when children leave for school, teachers confirm arrival. Complete transparency and safety.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "Praise & Communication",
      description:
        "Teachers can praise students and address concerns directly with parents in real-time.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description:
        "Monitor academic progress with detailed reports and analytics for better learning outcomes.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: ShoppingBag,
      title: "School Store",
      description:
        "Convenient online ordering for uniforms, books, and school supplies with easy payment.",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Stay updated with announcements, events, and important school information instantly.",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description:
        "Tailored dashboards for parents, teachers, and administrators with role-based permissions.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

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

  const faqs = [
    {
      question: "How does the attendance tracking work?",
      answer:
        "Parents mark when their child leaves for school using the mobile app. Teachers then confirm the child's arrival at school. This dual-verification system ensures complete transparency and safety. Parents receive instant notifications when their child arrives safely.",
    },
    {
      question: "Is my child's data secure?",
      answer:
        "Absolutely. We use bank-level encryption to protect all data. Only authorized school staff and parents have access to relevant information. We comply with all data protection regulations and never share personal information with third parties.",
    },
    {
      question: "What if there's a mismatch in attendance?",
      answer:
        'If a parent marks their child as "left for school" but the teacher marks them absent, the system immediately alerts both parties. This helps identify potential safety issues quickly and ensures no child goes unaccounted for.',
    },
    {
      question: "Can I communicate directly with teachers?",
      answer:
        "Yes! KidSafe includes a built-in messaging system for praise, concerns, and general communication. Teachers can send praise for good behavior, and parents can raise concerns or ask questions. All communication is logged and accessible to relevant parties.",
    },
    {
      question: "How much does KidSafe cost?",
      answer:
        "KidSafe offers flexible pricing plans for schools of all sizes. We provide a 30-day free trial with no credit card required. Contact our sales team for detailed pricing information tailored to your school's needs.",
    },
    {
      question: "Do you provide training and support?",
      answer:
        "Yes! We provide comprehensive onboarding, training sessions for staff and parents, and 24/7 customer support. Our team ensures smooth implementation and ongoing success with the platform.",
    },
    {
      question: "Can parents access the system on mobile devices?",
      answer:
        "Absolutely! KidSafe is fully responsive and works perfectly on smartphones, tablets, and computers. We also offer dedicated mobile apps for iOS and Android for the best user experience.",
    },
    {
      question: "What happens if a parent forgets to mark departure?",
      answer:
        "The system sends gentle reminders to parents. If a child arrives at school but wasn't marked as departed, teachers can still mark them present, and parents receive a notification to confirm the child's safe arrival.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Protected" },
    { number: "500+", label: "Schools Trust Us" },
    { number: "99.9%", label: "Attendance Accuracy" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1.5s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .group:hover .group-hover-scale {
          transform: scale(1.1);
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">KidSafe</h1>
                <p className="text-xs text-gray-600">
                  Kids Safety Attendance System
                </p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 hover:bg-blue-200 transition-colors duration-500">
                <Shield className="w-4 h-4" />
                Trusted by 500+ Schools
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Keep Your Children
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  Safe & Connected
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The complete school management platform that ensures student
                safety through smart attendance tracking, seamless
                parent-teacher communication, and comprehensive academic
                monitoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:scale-105 transform transition-all duration-300 text-lg">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 text-yellow-400 fill-current transition-all duration-300 hover:scale-125`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold">4.9/5</span> from 2,000+
                  reviews
                </p>
              </div>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group">
                    <Shield className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Today's Safety Status
                    </h3>
                    <p className="text-sm text-gray-600">
                      All students accounted for
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: "Emma Johnson",
                      status: "Arrived Safely",
                      icon: CheckCircle,
                      color: "emerald",
                    },
                    {
                      name: "Liam Smith",
                      status: "Arrived Safely",
                      icon: CheckCircle,
                      color: "emerald",
                    },
                    {
                      name: "Olivia Davis",
                      status: "En Route",
                      icon: Clock,
                      color: "blue",
                    },
                  ].map((student, index) => (
                    <div
                      key={student.name}
                      className={`flex items-center justify-between p-3 bg-${student.color}-50 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
                      style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <student.icon
                          className={`w-5 h-5 text-${student.color}-600`}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {student.name}
                        </span>
                      </div>
                      <span
                        className={`text-xs text-${student.color}-600 font-medium`}
                      >
                        {student.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating elements with animations */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-xl shadow-lg animate-float">
                <Heart className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-xl shadow-lg animate-bounce-gentle">
                <Bell className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 bg-gray-50 opacity-0 transition-all duration-700"
        ref={(el) => el && sectionsRef.current.push(el)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={parseInt(stat.number)} duration={2} />+
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 opacity-0 transition-all duration-700"
        ref={(el) => el && sectionsRef.current.push(el)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for School Safety
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform brings together all the tools schools
              and parents need to ensure student safety and academic success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 transition-all duration-700"
        ref={(el) => el && sectionsRef.current.push(el)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How KidSafe Works
            </h2>
            <p className="text-xl text-blue-100">
              Simple, secure, and effective in just three steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                title: "Parent Marks Departure",
                description:
                  "Parents use the app to mark when their child leaves for school, creating the first safety checkpoint.",
                color: "bg-blue-600",
              },
              {
                number: 2,
                title: "Teacher Confirms Arrival",
                description:
                  "Teachers take attendance and confirm safe arrival, with automatic notifications to parents.",
                color: "bg-emerald-600",
              },
              {
                number: 3,
                title: "Continuous Communication",
                description:
                  "Ongoing updates about academic progress, events, and any concerns throughout the day.",
                color: "bg-purple-600",
              },
            ].map((step, index) => (
              <div
                key={step.number}
                className="text-center group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-20 h-20 ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-blue-100">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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

      {/* FAQ Section */}
      <section
        className="py-20 bg-gray-50 opacity-0 transition-all duration-700"
        ref={(el) => el && sectionsRef.current.push(el)}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about KidSafe
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 transition-all duration-700"
        ref={(el) => el && sectionsRef.current.push(el)}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Keep Your Children Safe?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of families and schools who trust KidSafe for student
            safety and communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transform transition-all duration-300 text-lg">
              Schedule Demo
            </button>
          </div>
          <p className="text-blue-100 mt-6">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">KidSafe</h3>
                  <p className="text-xs text-gray-400">
                    Kids Safety Attendance System
                  </p>
                </div>
              </div>
              <p className="text-gray-400">
                Keeping children safe through smart technology and seamless
                communication.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "API"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Training", "Status"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Privacy"],
              },
            ].map((column, index) => (
              <div
                key={column.title}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <h4 className="font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KidSafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
