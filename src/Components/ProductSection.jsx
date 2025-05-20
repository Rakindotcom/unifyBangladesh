// src/components/ProductSection.jsx
import React from "react";

const products = [
  {
    "S/L": 1,
    "Products Name": "AXIS-Y Dark Spot Correcting Glow Serum",
    "Categories": "Serum",
    "Size": "50 ml",
    "Regular Price": 1700,
    "Price": 1299,
    "Description": "A 5% Niacinamide-based serum that corrects dark spots and improves uneven skin tone. With the help of plant-derived Squalane, this serum retains moisture to keep your skin glowing and healthy wherever you go.\n \nCountry of Origin: Korea.",
    "Photo Link": "https://drive.google.com/file/d/1DHBB-tlXaJx6PSzpXyaa0vGjledPpgmI/view?usp=drive_link"
  },
  {
    "S/L": 2,
    "Products Name": "Cosrx Advanced Snail 96 Mucin Power Essence",
    "Categories": "Essence",
    "Size": "100 ml",
    "Regular Price": 1950,
    "Price": 1549,
    "Description": "Natural glow from healthy skin!\n\nWhat it is: Light- weight essence which absorbed into skin fast and gives skin natural glow from inside.\n\nWHY IT'S SPECIAL:\n\nSnail Mucin96.3% of Snail Secretion Filtrate helps protect the skin from moisture loss while improving skin elasticity. Snail mucin helps repair and soothes red, sensitive skin after breakouts by replenishing moisture.\nLightweight EssenceLightweight, yet moisturizing texture gives you long-lasting hydration without feeling heavy on the skin.\nCruelty-FreeCOSRX is a cruelty-free brand and we do not test on animals. Our snail mucin products are also 100% cruelty-free which caused no harm to animals throughout the making process.",
    "Photo Link": "https://drive.google.com/file/d/1c5xQ8SLpwuzfU3HazMLk4R2vjmEWUv7f/view?usp=drive_link"
  },
  {
    "S/L": 3,
    "Products Name": "Cosrx Advanced Snail 96 Mucin Power Essence",
    "Categories": "Essence",
    "Size": "30 ml",
    "Regular Price": 850,
    "Price": 599,
    "Description": "Natural glow from healthy skin!\n\nWhat it is: Light- weight essence which absorbed into skin fast and gives skin natural glow from inside.\n\nWHY IT'S SPECIAL:\n\nSnail Mucin96.3% of Snail Secretion Filtrate helps protect the skin from moisture loss while improving skin elasticity. Snail mucin helps repair and soothes red, sensitive skin after breakouts by replenishing moisture.\nLightweight EssenceLightweight, yet moisturizing texture gives you long-lasting hydration without feeling heavy on the skin.\nCruelty-FreeCOSRX is a cruelty-free brand and we do not test on animals. Our snail mucin products are also 100% cruelty-free which caused no harm to animals throughout the making process.",
    "Photo Link": "https://drive.google.com/file/d/1W9-B2H8mUbfyYWiSB4Yrbxs6riD5xtjK/view?usp=drive_link"
  },
  {
    "S/L": 4,
    "Products Name": "COSRX Advanced Snail 92 All In One Cream",
    "Categories": "Cream & Moisturizers",
    "Size": "50 gm",
    "Regular Price": 1300,
    "Price": 970,
    "Description": "Texture: gel-like cream;\nSkin issues: redness, dullness, uneven skin tone, dark spots, wrinkles, dehydration, sensitivity\nTime of application: morning and evening\nAge: 12+\nSkin type: all skin types, including sensitive;\nMain benefits: provides long-lasting hydration, nourishes and plumps the skin, helps repair damaged skin, fades dark spots, has anti-aging benefits\nFormulated without: fragrance, gluten, parabens, silicones, mineral oils.\n \nCountry of Origin: Korea.",
    "Photo Link": "https://drive.google.com/file/d/1copgQBe3OXoxvsnNVLSUYFmFmTe7x6nJ/view?usp=drive_link"
  },
  {
    "S/L": 5,
    "Products Name": "COSRX Advanced Snail 92 All In One Cream",
    "Categories": "Cream & Moisturizers",
    "Size": "100 gm",
    "Regular Price": 2100,
    "Price": 1649,
    "Description": "Texture: gel-like cream;\nSkin issues: redness, dullness, uneven skin tone, dark spots, wrinkles, dehydration, sensitivity\nTime of application: morning and evening\nAge: 12+\nSkin type: all skin types, including sensitive;\nMain benefits: provides long-lasting hydration, nourishes and plumps the skin, helps repair damaged skin, fades dark spots, has anti-aging benefits\nFormulated without: fragrance, gluten, parabens, silicones, mineral oils.\n \nCountry of Origin: Korea.",
    "Photo Link": "https://drive.google.com/file/d/1CX6WOd4_2ej0AbLA6wQTeMBOvgKnJVwa/view?usp=drive_link"
  },
  {
    "S/L": 6,
    "Products Name": "Cosrx Salicylic Acid Daily Gentle Cleanser",
    "Categories": "Facewash & Cleanser",
    "Size": "150 ml",
    "Regular Price": 1500,
    "Price": 999,
    "Description": "What it is: Gently removes impurities and excess sebum while fighting acnes and blemishes, leaving skin soft and smooth without the stripping feeling.\n\nWHY IT’S SPECIAL:\n\nUnclog pores Foams with creamy texture draw out impurities from pores.\nNatural BHA component Dissolve oils away and provides fresh finish to the skin.\nSoothing and clearing Prevent formation of blackheads and whiteheads by exfoliation.\nSkin beneficial essence Control sebum production and cleanse all the dirt in pores.\n \nCountry of Origin: Korea.",
    "Photo Link": "https://drive.google.com/file/d/11hQ6G3oEOPkp63kP5MonD77BVGuUBwoS/view?usp=drive_link"
  },
  {
    "S/L": 7,
    "Products Name": "Cosrx Salicylic Acid Daily Gentle Cleanser",
    "Categories": "Facewash & Cleanser",
    "Size": "50 ml",
    "Regular Price": 800,
    "Price": 599,
    "Description": "What it is: Gently removes impurities and excess sebum while fighting acnes and blemishes, leaving skin soft and smooth without the stripping feeling.\n\nWHY IT’S SPECIAL:\n\nUnclog pores Foams with creamy texture draw out impurities from pores.\nNatural BHA component Dissolve oils away and provides fresh finish to the skin.\nSoothing and clearing Prevent formation of blackheads and whiteheads by exfoliation.\nSkin beneficial essence Control sebum production and cleanse all the dirt in pores.\n \nCountry of Origin: Korea.",
    "Photo Link": "https://drive.google.com/file/d/1juJ9wcR9oKC9qW3HwrlauB7LD63BJjnp/view?usp=drive_link"
  },
  {
    "S/L": 8,
    "Products Name": "DABO All In One Black Snail Repair Cream",
    "Categories": "Cream & Moisturizers",
    "Size": "100gm",
    "Regular Price": 1450,
    "Price": 1099,
    "Description": "GENUINE ABILITY OF SNAIL! IMPROVES COMPLEX SKIN TROUBLE! MAINTAINS AS HEALTHY AND GLOSSY SKIN!\n\nTotal care with snail of strong vitality : It is a highly nutritious cream that solves complex skin troubles. skin elasticity + moisturizing effect + skin glossiness + wrinkle care + whitening.\nIntensive supply of nutrients effective to the skin : Strong moisturizing ingredients such as macadama seed oil, shea butter, and hyaluronic acid meet for a long time to keep your skin moist and firm.\nChewy texture filled with snail mucus : As it contains snail mucus, its nutritious and sticky texture strongly adheres to skin without feeling of stickiness and gives massaging effect on skin.",
    "Photo Link": "https://drive.google.com/file/d/1VExTvmgHBMpFvIC64tu_8ad02J0u2hSI/view?usp=drive_link"
  },
  {
    "S/L": 9,
    "Products Name": "The Ordinary Niacinamide 10%+Zinc1%",
    "Categories": "Serum",
    "Size": "30 ml",
    "Regular Price": 1650,
    "Price": 1299,
    "Description": "Niacinamide (Vitamin B3) is indicated to reduce the appearance of skin blemishes and congestion. A high 10% concentration of this vitamin is supported in the formula by zinc salt of pyrrolidone carboxylic acid to balance visible aspects of sebum activity.\n\nContraindications: If topical Vitamin C (L-Ascorbic Acid and/or Ethylated L-Ascorbic Acid) is used as part of skincare, it should be applied at alternate times with this formula (ideally Vitamin C in the PM and this formula in the AM). Otherwise, Niacinamide can affect integrity of the Vitamin C.\n\nNotes: While Niacinamide and Zinc PCA reduce the look of blemishes and balance visible sebum activity, neither is a treatment for acne. For persistent acne-related conditions, we recommend the use of Benzoyl Peroxide and/or Retinoic Acid. DECIEM doesn't recommend ongoing use of BHA such as Salicylic Acid for persistent blemishes. For temporary improvement in appearance of blemishes, Salicylic Acid would help. This formulation can be used alongside acne treatments if desired for added visible skin benefits. Independent studies suggest Niacinamide is also an effective ingredient for brightening skin tone.",
    "Photo Link": "https://drive.google.com/file/d/1OGQ3_C75V__54Ou1U4_Tqt7X9kAE1hI8/view?usp=drive_link"
  },
  {
    "S/L": 10,
    "Products Name": "The Ordinary Niacinamide 10%+Zinc1%",
    "Categories": "Serum",
    "Size": "60ml",
    "Regular Price": 2900,
    "Price": 2299,
    "Description": "Niacinamide (Vitamin B3) is indicated to reduce the appearance of skin blemishes and congestion. A high 10% concentration of this vitamin is supported in the formula by zinc salt of pyrrolidone carboxylic acid to balance visible aspects of sebum activity.\n\nContraindications: If topical Vitamin C (L-Ascorbic Acid and/or Ethylated L-Ascorbic Acid) is used as part of skincare, it should be applied at alternate times with this formula (ideally Vitamin C in the PM and this formula in the AM). Otherwise, Niacinamide can affect integrity of the Vitamin C.\n\nNotes: While Niacinamide and Zinc PCA reduce the look of blemishes and balance visible sebum activity, neither is a treatment for acne. For persistent acne-related conditions, we recommend the use of Benzoyl Peroxide and/or Retinoic Acid. DECIEM doesn't recommend ongoing use of BHA such as Salicylic Acid for persistent blemishes. For temporary improvement in appearance of blemishes, Salicylic Acid would help. This formulation can be used alongside acne treatments if desired for added visible skin benefits. Independent studies suggest Niacinamide is also an effective ingredient for brightening skin tone.",
    "Photo Link": "https://drive.google.com/file/d/1OGQ3_C75V__54Ou1U4_Tqt7X9kAE1hI8/view?usp=drive_link"
  },
  {
    "S/L": 11,
    "Products Name": "Missha All Around Safe Block Soft Finish Sun Milk SPF50+ Or PA+++",
    "Categories": "Sunscreen",
    "Size": "70ML",
    "Regular Price": 1500,
    "Price": 1199,
    "Description": "MISSHA All Around Safe Block Soft Finish Sun Milk SPF50+/PA+++ is lightweight and refreshing sun milk formula, perfect for daily use. At the same time, it is water and sweat resistant too.\n\nUV Protection\nNon-irritating Formula\nDermatologically Tested",
    "Photo Link": "Photo"
  },
  {
    "S/L": 12,
    "Products Name": "Missha All Around Safe Block Aqua Sun Gel SPF50+/PA++++",
    "Categories": "Sunscreen",
    "Size": "50 ml",
    "Regular Price": 1350,
    "Price": 999,
    "Description": "High SPF and PA Rating: Formulated with SPF50+ and PA++++, this sun gel offers advanced protection against both aging UVA and burning UVB rays, ensuring comprehensive coverage for your skin.\nAqua-infused Formula: Immerse your skin in a burst of hydration with the Aqua Sun Gel's water-based formula. It absorbs quickly, leaving your skin feeling fresh and moisturized without any greasy residue.\nNon-Sticky and Lightweight: Say goodbye to heavy, sticky sunscreens. This gel glides effortlessly onto your skin, providing a weightless feel and allowing for easy layering with your daily skincare and makeup routine.\nGentle on Skin: Suitable for all skin types, including sensitive skin, the Missha All Around Safe Block Aqua Sun Gel is dermatologist-tested and free from harsh chemicals, making it ideal for everyday use.\nTransparent Finish: Achieve a natural, transparent finish without the white cast commonly associated with some sunscreens. This sun gel seamlessly blends into your skin, leaving it looking radiant and ready for any occasion.\nLong-lasting Protection: Whether you're out for a day in the sun or going about your daily activities, this long-lasting sun gel ensures your skin remains protected throughout the day.",
    "Photo Link": "https://drive.google.com/file/d/15hPBrV7-iY06Mn6spHmLxYM3nM65lpp_/view?usp=drive_link"
  },
  {
    "S/L": 13,
    "Products Name": "Nivea Soft Light Moisturising Cream",
    "Categories": "Cream & Moisturizers",
    "Size": "100gm",
    "Regular Price": 550,
    "Price": 355,
    "Description": "Nivea Soft Moisturising Cream with Jojoba Oil and Vitamin E offers refreshingly soft moisturising for face, body and hands. NIVEA Soft Intensive Moisturising Creme is ph neutral and dermatological approved. How It Works Use NIVEA Soft on face, hands and body. Get rich moisture care with Jojoba Oil and Vitamin E Sense the fast absorbing cream Feel and see how your skin gets sensationally soft and smooth.\n\nFor face, body, and hands.\nWith Jojoba Oil and Vitamin E.\nEveryday use.",
    "Photo Link": "https://drive.google.com/file/d/1tEl4X1HVEEWl0HKgvgcJ3aR5DzBVFFdu/view?usp=drive_link"
  },
  {
    "S/L": 14,
    "Products Name": "3W Clinic Intensive UV Sunblock Cream SPF 50+PA+++",
    "Categories": "Sunscreen",
    "Size": "70ml",
    "Regular Price": 650,
    "Price": 499,
    "Description": "3W Clinic Intensive UV Sunblock Cream provides pleasant and reliable protection from suntan, inflammation, redness, discoloration, and sign of ageing. It is a lightweight daily cream is all-in-one. It protects your skin from age-causing UVA rays and burn-causing UVB rays, while at the same time moisturizes and reflecting the radiation rays. This SPF50 / Pa + + + Sunblock contains aloe vera extract that absorbs into the skin quickly for a non-greasy and provide velvety smooth finish, also creating a perfect base for makeup.\n\nShields from Harmful UVA/UVB Rays\nContains with aloe vera extract\nProtect from sunburns and tanning\nFight against sign of ageing\nSoothes skin irritation\nCreating a perfect base for makeup\nNon-greasy, lightweight and quick absorption\n \nCountry of Origin: Korea.",
    "Photo Link": "https://drive.google.com/file/d/1BFYR8_s9yHaMYz_8scqXsvwaXLmmREOp/view?usp=drive_link"
  },
  {
    "S/L": 15,
    "Products Name": "Missha All Around Safe Block Cotton Sun SPF50+",
    "Categories": "Sunscreen",
    "Size": "50ml",
    "Regular Price": 1350,
    "Price": 999,
    "Description": "A super lightweight sunscreen that gives powerful broad-spectrum UVA/UVB protection. Its double-layer UV blocking system provides long lasting sun protection, even in humid conditions. The essence formula prevents sunburn and premature ageing with SPF 45/PA+++ and incorporates a nourishing and hydrating skincare element. A great selection of plant extracts such as apricot, lotus, camellia, aloe and cucumber, give this sunscreen a soothing and moisturising effect. It is great at keeping skin hydrated and protected against environmental stresses. The sunscreen is water-resistant, sweat-resistant and oil-free. Incredibly light in texture and leaves absolutely no greasy feeling or white cast on your skin.",
    "Photo Link": "https://drive.google.com/file/d/19bQG4TbDzcSNs9WD2iBy8yuMtHBjZRCM/view?usp=drive_link"
  },
  {
    "S/L": 16,
    "Products Name": "Christian Dean Secret Tone Up Sun Cream",
    "Categories": "Sunscreen",
    "Size": "50ml",
    "Regular Price": 650,
    "Price": 499,
    "Description": "Christian Dean Secret tone-up sun cream is your ultimate skincare solution for achieving a vibrant and glowing complexion. With its SPF50+ PA+++ formula, this sun cream provides superior protection against harmful UV rays while giving your skin a subtle, light pink shade that perfectly blends with your natural skin tone.",
    "Photo Link": "https://drive.google.com/file/d/1iZ55ZLU3vUjr1s5SKlTHlWQwn_FpCt_T/view?usp=drive_link"
  },
  {
    "S/L": 17,
    "Products Name": "Foodaholic Sun Multi Sun Cream SPF 50+ PA+++",
    "Categories": "Sunscreen",
    "Size": "70ml",
    "Regular Price": 650,
    "Price": 550,
    "Description": "",
    "Photo Link": "https://drive.google.com/file/d/1HtbLPUXOBhAl1lgpHuTkqUai1q2qNwNp/view?usp=drive_link"
  },
  {
    "S/L": 18,
    "Products Name": "COSRX Hyaluronic Acid Intensive Cream",
    "Categories": "Cream & Moisturizers",
    "Size": "100gm",
    "Regular Price": 2050,
    "Price": 1650,
    "Description": "Hyaluronic acid Intensive Cream is a moisture cream filled with moisture-retention ingredients such as Hippophae\nRhamnoides Water (called vitamin tree)\nHyaluronic acid intensive cream is not heavy, good for use as lotion, and transfers abundant moisture and suppleness to flaky face\nMade in Korea",
    "Photo Link": "https://drive.google.com/file/d/1CMMOh1_54hQ5cBMeAVJbNyC9Y2i1dRD_/view?usp=drive_link"
  },
  {
    "S/L": 19,
    "Products Name": "SKIN 1004 Madagascar Centella Toning Toner",
    "Categories": "Toner",
    "Size": "30ml",
    "Regular Price": 1000,
    "Price": 799,
    "Description": "This is a daily Toning Toner that contains Centella Asiatica Extract, a symbol of purity in Madagascar, and PHA, a gentle exfoliating ingredient. These properties help maintain clearer and healthier skin and aid in activating the skin turnover cycle.\n\nGentle exfoliating toner with light, watery texture\nEveryday toner infused with centella asiatica extract and PHA, a mild exfoliator\nPHA, mild exfoliating formula activates gradually on the skin to gently remove sebum and dead skin cells\nCertified brightening & anti-aging benefits for clear and elastic skin\nNon-comedogenic test complete, safe for acne skin and all other skin types\n \n\nCountry of Origin: Korea.",
    "Photo Link": "https://drive.google.com/file/d/13BtgyGX6BqBz9-W6lUWzVeQ72kDGP9EQ/view?usp=drive_link"
  },
  {
    "S/L": 20,
    "Products Name": "Cosrx Acne Pimple Master Patch",
    "Categories": "Face Mask",
    "Size": "Free",
    "Regular Price": 550,
    "Price": 330,
    "Description": "The thin clear hydrocolloid patch feels similar to a hydrogel sheet mask in texture, adhering your skin strongly. It'll stay on through showering and washing! It treats breakouts by eliminating infection and bacteria, which is what causes them in the first place. It's able to breakdown debris from blackheads and absorb gunk from whiteheads overnight, so you won't experience a harsh dry patch from using this. It even helps flatten and heal cystic acne faster!",
    "Photo Link": "https://drive.google.com/file/d/17jSTq88VfKtHqN_pBQf0icHNYtNzXijp/view?usp=drive_link"
  },
  {
    "S/L": 21,
    "Products Name": "3W Clinic Fresh Cucumber Sheet Mask",
    "Categories": "Face Mask",
    "Size": "Free",
    "Regular Price": 150,
    "Price": 130,
    "Description": "A sheettype, hypoallergenic facial mask Contains cucumber extracts to hydrate & soothe dry, tired skin Provides cleaning & astringent effects to remove grease & oil Attaches perfectly to the face along with the natural skin texture Made of 100% cotton with an elastic texture Leaves skin calm, smooth, refreshed & comfortable.",
    "Photo Link": "https://drive.google.com/file/d/11o8hsr6uAuSrl-l6BJEz8t6kfH8JdLZF/view?usp=drive_link"
  },
  {
    "S/L": 22,
    "Products Name": "MISSHA AIRY FIT SHEET MASK (TEA TREE)",
    "Categories": "Face Mask",
    "Size": "Free",
    "Regular Price": 240,
    "Price": 220,
    "Description": "MISSHA Airy Fit Sheet Masks are 50% lighter than conventional sheet masks, allowing them to stick to your face \"like mochi\" to deliver superior moisture and nutrition to the skin. Perfect adhesion like glutinous rice cake! Skin-fit daily sheet mask to deliver active ingredients to the skin effectively by sticky adhesion. A great fresh-up through the cold brewing method: active ingredients are released to the skin more safely and with more freshness.\n\n100% natural ingredients and for every skin type:\n\nWater type - Moisturising and light, watery essence for a refreshing finish.\nCream type - Rich, creamy essence for elastic skin full of moisture.\nAmpoule type - Moisturising and nourishing essence for a smooth and soft skin texture",
    "Photo Link": "https://drive.google.com/file/d/132bxv8_6jOAvP33UYGvPIMp97eClz0y2/view?usp=drive_link"
  },
  {
    "S/L": 23,
    "Products Name": "The Face Shop Rice Water Bright Facial Foaming Cleanser",
    "Categories": "Facewash & Cleanser",
    "Size": "150ml",
    "Regular Price": 1200,
    "Price": 999,
    "Description": "Washes away impurities effortlessly\nServes as the second step of double cleansing\nBrightens the skin\nDeep cleanses the skin\nTakes you a step closer to glass like skin",
    "Photo Link": "https://drive.google.com/file/d/1fKwk5-HEeIrGKm7utZzWd6OHd3ciHSqM/view?usp=drive_link"
  },
  {
    "S/L": 24,
    "Products Name": "COSRX Low Ph Good Morning Gel Cleanser",
    "Categories": "Facewash & Cleanser",
    "Size": "150ml",
    "Regular Price": 1500,
    "Price": 1099,
    "Description": "Sustain moisture every day and all day long.\nMildly acidic pH 5.0 ~ 6.0.\nGood Morning Gel Cleanser pH 5.0 ~ 6.0 : similar to skin's natural pH level.\nContain tea-tree oil : control oily skin, shrink pore size.\nContain natural BHA : refine skin texture.\nGel type : smooth and skin friendly.\nMade in Korea",
    "Photo Link": "https://drive.google.com/file/d/1Inf8cWXVf6eZ1OwCRVaDS-WLQtGZb0Wr/view?usp=drive_link"
  },
  {
    "S/L": 25,
    "Products Name": "Ponds BB+ Cream Instant Spot Coverage + Light Make-up Glow Ivory",
    "Categories": "Makeup",
    "Size": "18gm",
    "Regular Price": 370,
    "Price": 330,
    "Description": "Vitamin Enriched cream + Lightweight foundation\nNow available in 2 shades: Ivory - for light to medium skin tone & Natural - for medium to deep medium skin tone\nInstant Spot Coverage + Light Make-up Glow\nEvens skin tone\nSPF 30 PA++\nLightens spots from within",
    "Photo Link": "https://drive.google.com/file/d/189nX1KolQ67olYPzC5JsA2KGn8xZrEGC/view?usp=drive_link"
  },
  {
    "S/L": 26,
    "Products Name": "Maybelline Baby Skin Instant Pore Eraser",
    "Categories": "Face Primer",
    "Size": "22ml",
    "Regular Price": 1200,
    "Price": 950,
    "Description": "Baby Skin® Instant Pore Eraser®. This makeup primer leaves skin with a baby smooth and matte finish. Moisturizes all day. This lightweight and breathable pore-blurring makeup primer leaves skin with a smooth matte finish.\n\nNon-comedogenic.\nFragrance-free.",
    "Photo Link": "https://drive.google.com/file/d/17Hu8NvdhDMMbIcZYVFs0Vt2jG6DYKGty/view?usp=drive_link"
  }
]

const getImageUrl = (link) => {
  const match = link.match(/\/d\/(.+?)\//);
  return match ? `https://drive.google.com/uc?id=${match[1]}` : "";
};

const ProductSection = () => {
  return (
    <section className="px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={getImageUrl(item["Photo Link"])}
                alt={item["Products Name"]}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item["Products Name"]}</h3>
                <p className="text-sm text-gray-500">{item["Categories"]}</p>
                <p className="text-sm text-gray-500 mb-1">Size: {item["Size"]}</p>
                <div className="mb-2">
                  <span className="text-red-500 line-through mr-2">৳ {item["Regular Price"]}</span>
                  <span className="text-green-600 font-bold">৳ {item["Price"]}</span>
                </div>
                <p className="text-gray-600 text-sm">{item["Description"]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
