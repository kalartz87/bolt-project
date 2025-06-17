import React from 'react';
import { Category } from '../../types';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

export function CategoryGrid({ categories, onCategorySelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="relative h-32 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold text-center">{category.name}</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-2">{category.description}</p>
            <p className="text-blue-600 font-semibold">{category.productCount} products</p>
          </div>
        </div>
      ))}
    </div>
  );
}