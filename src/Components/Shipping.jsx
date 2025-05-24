import React from 'react';

const Shipping = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Shipping Information</h1>

      <h2 className="text-2xl font-semibold text-center">How does the delivery process work?</h2>
      <p className="text-justify">
        Once our system processes your order, your products are inspected thoroughly to ensure they are in a perfect condition. After they pass through the final round of quality check, they are packed and handed over to our trusted delivery partner. Our delivery partners then bring the package to you at the earliest possibility. In case they are unable to reach your provided address or at a suitable time, they will contact you to resolve the issue. <strong>Unify Bangladesh</strong> maintains a ‘closed box delivery’ policy, which is crucial to ensure the authenticity of the products, privacy of the customers, and prevention of product adulteration or modification.
      </p>

      <h2 className="text-2xl font-semibold text-center">How are items packaged?</h2>
      <p className="text-justify">
        We package our products in cardboard boxes with your invoice wrapped along with it. Each individual product is carefully packaged, while fragile items like bottles are safely secured with bubble wrap.
      </p>

      <h2 className="text-2xl font-semibold text-center">What are the delivery charges?</h2>
      <ul className="list-disc list-inside space-y-2">
        <li className="text-justify">Inside Dhaka: 50 BDT</li>
        <li className="text-justify">Outside Dhaka: 100 BDT</li>
      </ul>

      <h2 className="text-2xl font-semibold text-center">What is the estimated delivery time?</h2>
      <ul className="list-disc list-inside space-y-2">
        <li className="text-justify">Inside Dhaka: 1-2 days</li>
        <li className="text-justify">Outside Dhaka: 3-5 days</li>
      </ul>
      <p className="text-justify">
        However, the delivery might be delayed based on political, environmental, transportation, or any other unavoidable issues, which will be notified by our customer relationship team.
      </p>

      <hr className="my-8" />

      <h2 className="text-3xl font-bold text-center bangla">শিপিং তথ্য</h2>

      <h3 className="text-2xl font-semibold text-center bangla">ডেলিভারি প্রসেসটি কীভাবে সম্পন্ন হয়ে থাকে?</h3>
      <p className="text-justify bangla">
        আপনাদের অর্ডারটি প্রসেস করার সময় প্রতিটি প্রোডাক্ট অত্যন্ত নিখুঁতভাবে পর্যবেক্ষণ করা হয়। শেষ ধাপের কোয়ালিটি চেকের পর প্রোডাক্টগুলো প্যাক করে আমাদের ডেলিভারি পার্টনারের কাছে হস্তান্তর করা হয়। এরপর ডেলিভারি টিম যত দ্রুত সম্ভব প্রোডাক্টগুলো আপনাদের কাছে পৌঁছে দেয়। যদি তারা আপনাদের সাথে যোগাযোগ করতে না পারে কিংবা আপনার দেয়া ঠিকানায় পৌঁছাতে না পারে, এক্ষেত্রে যত দ্রুত সম্ভব ইস্যুটি সমাধানে ডেলিভারি টিম আপনাদের সাথে যোগাযোগ করবে। <strong>Unify Bangladesh</strong> ‘ক্লোজড বক্স ডেলিভারি’ পলিসি অনুসরণ করে থাকে, যা প্রোডাক্টের অথেন্টিসিটি, কাস্টমারের গোপনীয়তা বজায় রাখা এবং প্রোডাক্টের ভেজাল অথবা কোনো ধরণের পরিবর্তন রোধ নিশ্চিত করার জন্য অত্যন্ত গুরুত্বপূর্ণ।
      </p>

      <h3 className="text-2xl font-semibold text-center bangla">প্রোডাক্টগুলো কীভাবে প্যাকেজিং করা হয়?</h3>
      <p className="text-justify bangla">
        আমরা আপনাদের ইনভয়েস সহ প্রোডাক্টগুলো কার্ডবোর্ডের বক্সে প্যাকেজিং করে থাকি। প্রতিটি প্রোডাক্ট পৃথক পৃথকভাবে সাবধানতার সাথে প্যাকেজিং করা হয়ে থাকে। বোতল কিংবা ভেঙে যাবার আশংকা যুক্ত প্রোডাক্টগুলোকে বাবল র‍্যাপ দিয়ে প্যাকেজিং করা হয়ে থাকে।
      </p>

      <h3 className="text-2xl font-semibold text-center bangla">ডেলিভারি চার্জ কত?</h3>
      <ul className="list-disc list-inside space-y-2 bangla">
        <li className="text-justify bangla">ঢাকার ভেতরে: ৫০ টাকা</li>
        <li className="text-justify bangla">ঢাকার বাইরে: ১০০ টাকা</li>
      </ul>

      <h3 className="text-2xl font-semibold text-center bangla">কত দিনের মধ্যে ডেলিভারি দেয়া হয়?</h3>
      <ul className="list-disc list-inside space-y-2 bangla">
        <li className="text-justify bangla">ঢাকার মধ্যে: ১ – ২ দিন</li>
        <li className="text-justify bangla">ঢাকার বাইরে: ৩ – ৫ দিন</li>
      </ul>
      <p className="text-justify bangla">
        প্রাকৃতিক কোনো দুর্যোগ, রাজনৈতিক পরিস্থিতি, যানবাহন জনিত কিংবা কোনো গোলযোগের কারণে ডেলিভারি দিতে দেরী হলে, সেক্ষেত্রে কাস্টমার রিলেশন টিম আপনাদের সে সম্পর্কে অবহিত করবে।
      </p>
    </div>
  );
};

export default Shipping;