import React, { useState } from 'react';
import { HeroSlider } from '../components/UI/HeroSlider';
import { CategorySlider } from '../components/UI/CategorySlider';
import { ProductSlider } from '../components/UI/ProductSlider';
import { ProductGrid } from '../components/Products/ProductGrid';
import { mockCategories, mockProducts } from '../data/mockData';
import { Sparkles, Shield, Truck, HeadphonesIcon } from 'lucide-react';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? mockProducts.filter(product => 
        mockCategories.find(cat => cat.id === selectedCategory)?.name === product.category
      )
    : mockProducts;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
  };

  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = mockProducts.slice(2, 6);
  const bestSellers = mockProducts.slice(1, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSlider />
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Kalartz?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best online shopping with our premium features and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Premium Quality",
                description: "Curated products from verified vendors",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure Shopping",
                description: "100% secure payment and buyer protection",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Fast Delivery",
                description: "Quick and reliable shipping worldwide",
                color: "from-blue-400 to-cyan-500"
              },
              {
                icon: <HeadphonesIcon className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Round-the-clock customer assistance",
                color: "from-purple-400 to-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category Slider */}
        <CategorySlider 
          categories={mockCategories} 
          onCategorySelect={handleCategorySelect}
        />

        {/* Product Sliders */}
        <ProductSlider 
          products={featuredProducts}
          title="Featured Products"
          subtitle="Handpicked items just for you"
        />

        <ProductSlider 
          products={newArrivals}
          title="New Arrivals"
          subtitle="Fresh products added this week"
        />

        <ProductSlider 
          products={bestSellers}
          title="Best Sellers"
          subtitle="Most popular items on Kalartz"
        />

        {/* All Products Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedCategory 
                  ? `${mockCategories.find(cat => cat.id === selectedCategory)?.name} Products`
                  : 'All Products'
                }
              </h2>
              <p className="text-gray-600">
                {selectedCategory ? 'Explore products in this category' : 'Browse our complete collection'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {selectedCategory && (
                <button
                  onClick={handleShowAll}
                  className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                >
                  Show All Categories
                </button>
              )}
              <select className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}