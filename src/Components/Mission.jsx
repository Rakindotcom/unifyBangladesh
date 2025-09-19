import { Target, Eye } from "lucide-react";


const Mission = () => {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-12 font-inter">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 text-center mb-12">
          Our Mission & Vision
        </h1>

        {/* Mission Section */}
        <section
          className="bg-white rounded-2xl p-6 sm:p-8 mb-8 border border-orange-600/20 shadow-md shadow-gray-500"
          aria-labelledby="mission-heading"
        >
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 text-orange-600 mr-2" />
            <h2 id="mission-heading" className="text-2xl font-bold text-orange-600">
              Mission Statement
            </h2>
          </div>
          <div className="space-y-4">
            <p className="justifiedCenter text-gray-800 text-12px leading-relaxed">
              To provide 100% authentic, premium-quality cosmetics from trusted global brands, ensuring safety, confidence, and satisfaction for every customer in Bangladesh. We are committed to empowering beauty with trust, transparency, and excellence in service.
            </p>
            <p className="justifiedCenter bangla text-gray-800 text-12px leading-relaxed font-medium">
              বাংলাদেশে গ্রাহকদের জন্য বিশ্ববিখ্যাত ব্র্যান্ডের ১০০% আসল ও প্রিমিয়াম মানের কসমেটিক্স সরবরাহ করা, যা নিরাপত্তা, আস্থা ও সন্তুষ্টি নিশ্চিত করে। আমরা বিশ্বস্ততা, স্বচ্ছতা ও উৎকৃষ্ট সেবার মাধ্যমে সৌন্দর্যকে এগিয়ে নিতে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section
          className="bg-white rounded-2xl p-6 sm:p-8 mb-8 border border-orange-600/20 shadow-md shadow-gray-500"
          aria-labelledby="vision-heading"
        >
          <div className="flex items-center mb-4">
            <Eye className="h-6 w-6 text-orange-600 mr-2" />
            <h2 id="vision-heading" className="text-2xl font-bold text-orange-600">
              Vision Statement
            </h2>
          </div>
          <div className="space-y-4">
            <p className="justifiedCenter text-gray-800 text-12px leading-relaxed">
              To become Bangladesh’s most trusted and leading beauty destination by consistently delivering genuine global products, fostering long-term relationships, and setting new standards in customer care and product authenticity.
            </p>
            <p className="justifiedCenter bangla text-gray-800 text-12px leading-relaxed font-medium">
              বাংলাদেশের সবচেয়ে বিশ্বাসযোগ্য ও শীর্ষস্থানীয় বিউটি ব্র্যান্ড হিসেবে প্রতিষ্ঠা পাওয়া, যেখানে গ্রাহকদের সাথে দীর্ঘমেয়াদী সম্পর্ক গড়ে তোলা এবং পণ্য সত্যতা ও সেবার নতুন মানদণ্ড তৈরি করাই আমাদের লক্ষ্য।
            </p>
          </div>
        </section>

        {/* Navigation Link */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-6 rounded-lg font-bold text-base tracking-wide transition-colors duration-200 shadow-md hover:shadow-orange-600/40"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Mission;