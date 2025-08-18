import React from 'react';
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
  Heart
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Shield,
      title: 'Safe Attendance Tracking',
      description: 'Parents mark when children leave for school, teachers confirm arrival. Complete transparency and safety.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: MessageSquare,
      title: 'Praise & Communication',
      description: 'Teachers can praise students and address concerns directly with parents in real-time.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      icon: BarChart3,
      title: 'Performance Tracking',
      description: 'Monitor academic progress with detailed reports and analytics for better learning outcomes.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: ShoppingBag,
      title: 'School Store',
      description: 'Convenient online ordering for uniforms, books, and school supplies with easy payment.',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Stay updated with announcements, events, and important school information instantly.',
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      icon: Users,
      title: 'Multi-Role Access',
      description: 'Tailored dashboards for parents, teachers, and administrators with role-based permissions.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'KidSafe gives me complete peace of mind. I know exactly when Emma reaches school safely every day.'
    },
    {
      name: 'Mr. David Smith',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The platform makes communication with parents seamless. I can share praise and address concerns instantly.'
    },
    {
      name: 'Dr. Emily Clark',
      role: 'Principal',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'KidSafe has transformed how we manage our school. Everything is organized, transparent, and efficient.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Protected' },
    { number: '500+', label: 'Schools Trust Us' },
    { number: '99.9%', label: 'Attendance Accuracy' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">KidSafe</h1>
                <p className="text-xs text-gray-600">Kids Safety Attendance System</p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Trusted by 500+ Schools
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Keep Your Children
                <span className="text-blue-600"> Safe & Connected</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The complete school management platform that ensures student safety through smart attendance tracking, 
                seamless parent-teacher communication, and comprehensive academic monitoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors text-lg">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold">4.9/5</span> from 2,000+ reviews
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Today's Safety Status</h3>
                    <p className="text-sm text-gray-600">All students accounted for</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-900">Emma Johnson</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">Arrived Safely</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-900">Liam Smith</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">Arrived Safely</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Olivia Davis</span>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">En Route</span>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-xl shadow-lg">
                <Heart className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-xl shadow-lg">
                <Bell className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for School Safety
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform brings together all the tools schools and parents need 
              to ensure student safety and academic success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How KidSafe Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and effective in just three steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Parent Marks Departure</h3>
              <p className="text-gray-600">
                Parents use the app to mark when their child leaves for school, creating the first safety checkpoint.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Teacher Confirms Arrival</h3>
              <p className="text-gray-600">
                Teachers take attendance and confirm safe arrival, with automatic notifications to parents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Communication</h3>
              <p className="text-gray-600">
                Ongoing updates about academic progress, events, and any concerns throughout the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Families & Schools</h2>
            <p className="text-xl text-gray-600">See what our community has to say about KidSafe</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about KidSafe</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How does the attendance tracking work?</h3>
              <p className="text-gray-600">
                Parents mark when their child leaves for school using the mobile app. Teachers then confirm the child's arrival at school. 
                This dual-verification system ensures complete transparency and safety. Parents receive instant notifications when their child arrives safely.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is my child's data secure?</h3>
              <p className="text-gray-600">
                Absolutely. We use bank-level encryption to protect all data. Only authorized school staff and parents have access to relevant information. 
                We comply with all data protection regulations and never share personal information with third parties.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What if there's a mismatch in attendance?</h3>
              <p className="text-gray-600">
                If a parent marks their child as "left for school" but the teacher marks them absent, the system immediately alerts both parties. 
                This helps identify potential safety issues quickly and ensures no child goes unaccounted for.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I communicate directly with teachers?</h3>
              <p className="text-gray-600">
                Yes! KidSafe includes a built-in messaging system for praise, concerns, and general communication. Teachers can send praise for good behavior, 
                and parents can raise concerns or ask questions. All communication is logged and accessible to relevant parties.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How much does KidSafe cost?</h3>
              <p className="text-gray-600">
                KidSafe offers flexible pricing plans for schools of all sizes. We provide a 30-day free trial with no credit card required. 
                Contact our sales team for detailed pricing information tailored to your school's needs.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you provide training and support?</h3>
              <p className="text-gray-600">
                Yes! We provide comprehensive onboarding, training sessions for staff and parents, and 24/7 customer support. 
                Our team ensures smooth implementation and ongoing success with the platform.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can parents access the system on mobile devices?</h3>
              <p className="text-gray-600">
                Absolutely! KidSafe is fully responsive and works perfectly on smartphones, tablets, and computers. 
                We also offer dedicated mobile apps for iOS and Android for the best user experience.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens if a parent forgets to mark departure?</h3>
              <p className="text-gray-600">
                The system sends gentle reminders to parents. If a child arrives at school but wasn't marked as departed, 
                teachers can still mark them present, and parents receive a notification to confirm the child's safe arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Keep Your Children Safe?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of families and schools who trust KidSafe for student safety and communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg">
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
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">KidSafe</h3>
                  <p className="text-xs text-gray-400">Kids Safety Attendance System</p>
                </div>
              </div>
              <p className="text-gray-400">
                Keeping children safe through smart technology and seamless communication.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
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