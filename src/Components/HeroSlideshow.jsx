import { useState, useEffect } from "react";

const slides = [
    { src: "/1.webp", alt: "Slide 1" },
    { src: "/2.webp", alt: "Slide 2" },
    { src: "/3.webp", alt: "Slide 3" },
];

const HeroSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play: Change slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Handle dot navigation
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto mb-12">
            {/* Slides */}
            <div className="relative mt-10 mx-6 border-2 h-64 sm:h-80 lg:h-96 overflow-hidden rounded-2xl shadow-lg shadow-gray-700">
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.src}
                        alt={slide.alt}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                        aria-hidden={index !== currentSlide}
                    />
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide
                                ? "bg-orange-600"
                                : "bg-gray-400 hover:bg-maroon"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlideshow;