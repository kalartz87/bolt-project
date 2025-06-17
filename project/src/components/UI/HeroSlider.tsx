import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Zap } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  gradient: string;
  icon: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Welcome to Our Platform",
    subtitle: "Your Premium Marketplace",
    description: "Discover amazing products from trusted vendors worldwide",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Start Shopping",
    gradient: "from-blue-600 via-purple-600 to-indigo-700",
    icon: <ShoppingBag className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Premium Quality",
    subtitle: "Curated Collections",
    description: "Hand-picked products from verified vendors for the best experience",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Explore Collections",
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    icon: <Star className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Fast & Secure",
    subtitle: "Lightning Delivery",
    description: "Quick delivery with secure payment options and buyer protection",
    image: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Learn More",
    gradient: "from-orange-600 via-red-600 to-pink-700",
    icon: <Zap className="w-8 h-8" />
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative h-[600px] overflow-hidden rounded-2xl shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 transform translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 transform -translate-x-full'
                : 'opacity-0 transform translate-x-full'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          <div className="relative h-full flex items-center justify-center text-white">
            <div className="text-center max-w-4xl px-6">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                  {slide.icon}
                </div>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
                {slide.title}
              </h2>
              
              <h3 className="text-2xl md:text-3xl font-light mb-6 text-blue-100 animate-fade-in-up animation-delay-200">
                {slide.subtitle}
              </h3>
              
              <p className="text-lg md:text-xl mb-8 text-blue-50 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
                {slide.description}
              </p>
              
              <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in-up animation-delay-600">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}