"use client";

import React, { useState } from 'react';

const Questions = () => {
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is Omni?",
      answer: "Omni is a comprehensive, all-in-one digital ecosystem specifically engineered to streamline your personal and professional workflow. By centralizing your most essential tools into a single, intuitive interface, Omni eliminates the friction of switching between multiple applications, allowing you to focus on what truly matters: creativity and productivity. Whether you are managing complex projects or organizing daily tasks, Omni provides the infrastructure you need to succeed in a fast-paced digital environment."
    },
    {
      id: 2,
      question: "How do I Get Help If I Have Any Issues?",
      answer: "We pride ourselves on providing world-class support to our community. If you encounter any technical difficulties or have questions about our features, our dedicated support team is available 24/7 through several channels. You can initiate an instant conversation via our in-app live chat, submit a detailed ticket through our help desk, or explore our extensive knowledge base which contains hundreds of tutorials, video guides, and troubleshooting articles."
    },
    {
      id: 3,
      question: "Is Omni Good For Kids & Families?",
      answer: "Safety and collaboration are at the heart of the Omni experience. We have built robust, industry-leading parental controls that allow guardians to manage content visibility and monitor usage patterns effectively. For families, Omni offers shared workspaces where members can collaborate on household projects or school assignments in a secure environment. Our platform adheres to strict data privacy regulations, ensuring your family's information remains protected."
    },
    {
      id: 4,
      question: "How much Does Omni Cost?",
      answer: "Omni offers a variety of flexible pricing tiers tailored to meet different needs and budgets. We believe in accessibility, which is why we offer a feature-rich 'Free Forever' plan for individual users. For power users seeking advanced automation, our Premium plans start at just $9.99 per month. All paid plans come with a 30-day money-back guarantee, allowing you to explore the full potential of Omni risk-free."
    }
  ];

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    // 'w-full' va 'px-4' orqali ekranga moslashish ta'minlandi
    <section className="w-full flex flex-col items-center py-20 px-4 md:px-10 font-sans">
      
      {/* Sarlavha kengligi ham oshirildi */}
      <h2 className="w-full max-w-6xl text-3xl md:text-5xl font-semibold text-white mb-16 text-center">
        The Omni Questions Everyone's Asking
      </h2>

      {/* Accordion List - 'max-w-6xl' qilinib, ancha uzun (keng) holatga keltirildi */}
      <div className="w-full max-w-6xl space-y-6">
        {faqs.map((faq) => (
          <div 
            key={faq.id} 
            className={`collapse collapse-arrow border border-[#d62092] bg-transparent rounded-[2.8rem] transition-all duration-500 ${openId === faq.id ? 'collapse-open' : 'collapse-close'}`}
            onClick={() => toggleAccordion(faq.id)}
          >
            {/* Sarlavha qismi ichki paddingi oshirildi (px-12) */}
            <div className="collapse-title text-xl md:text-2xl font-medium text-white py-8 px-12 cursor-pointer">
              {faq.question}
            </div>
            
            <div className="collapse-content px-12"> 
              <p className="pb-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-5xl">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Questions;