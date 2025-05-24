import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: '১. আপনার সব পণ্য কি ১০০% আসল?',
      answer: 'হ্যাঁ, <strong>Unify Bangladesh</strong> কেবলমাত্র বিশ্বস্ত ব্র্যান্ডের ১০০% আসল ও আমদানিকৃত কসমেটিক্স বিক্রি করে।',
    },
    {
      question: '২. ক্যাশ অন ডেলিভারি (COD) কি পাওয়া যায়?',
      answer: 'হ্যাঁ, আমরা বাংলাদেশের বেশিরভাগ এলাকায় ক্যাশ অন ডেলিভারি সুবিধা দিই।',
    },
    {
      question: '৩. ডেলিভারিতে কতদিন সময় লাগে?',
      answer: 'সাধারণত <strong>২ থেকে ৫</strong> কর্মদিবস সময় লাগে, আপনার অবস্থানের উপর নির্ভর করে।',
    },
    {
      question: '৪. পণ্য রিটার্ন বা এক্সচেঞ্জ করা যাবে কি?',
      answer: 'হ্যাঁ, আপনি পণ্য ডেলিভারির <strong>৩</strong> দিনের মধ্যে রিটার্ন বা এক্সচেঞ্জ করতে পারেন যদি পণ্যটি ক্ষতিগ্রস্ত, ত্রুটিপূর্ণ বা ভুল হয়ে থাকে। খোলা বা ব্যবহৃত পণ্য রিটার্নযোগ্য নয়।',
    },
    {
      question: '৫. ঢাকা শহরের বাইরে কি ডেলিভারি হয়?',
      answer: 'হ্যাঁ, আমরা সারা বাংলাদেশে হোম ডেলিভারি করি।',
    },
    {
      question: '৬. কীভাবে অর্ডার দিতে পারি?',
      answer: 'আপনি আমাদের ফেসবুক পেজে ইনবক্স করে, সরাসরি মেসেজ দিয়ে বা অফিসিয়াল নম্বরে কল করে অর্ডার দিতে পারেন।',
    },
    {
      question: '৭. ডেলিভারি চার্জ কীভাবে গণনা হয়?',
      answer: 'ডেলিভারি চার্জ আপনার অবস্থান অনুসারে নির্ধারিত হয়।',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg border-3 border-orange-400 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 bangla">প্রায়শই জিজ্ঞাসিত প্রশ্নাবলি</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="w-full flex justify-between items-center py-4 text-left text-gray-600 hover:text-gray-800 focus:outline-none bangla"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold bangla">{faq.question}</span>
                <span className="text-xl">
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p
                  className="text-justify text-gray-600 pb-4 bangla"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;