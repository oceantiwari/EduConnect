import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQSectionProps {
  sectionsRef: React.MutableRefObject<HTMLElement[]>;
}

const FAQSection: React.FC<FAQSectionProps> = ({ sectionsRef }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
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
  );
};

export default FAQSection;
