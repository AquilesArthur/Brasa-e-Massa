import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { Plus } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    if (product.available_sizes || product.customizations) {
      setIsModalOpen(true);
    } else {
      // Direct add to cart
      addItem({
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        basePrice: product.price,
        finalPrice: product.price,
        quantity: 1,
        image: product.image,
        extras: [],
      });
    }
  };

  return (
    <>
      <div className="bg-bm-surface border border-bm-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-heading font-bold text-xl text-bm-dark-accent leading-tight">
              {product.name}
            </h3>
            <span className="font-bold text-bm-primary-accent whitespace-nowrap">
              {formatCurrency(product.price)}
              {product.available_sizes && <span className="text-xs text-bm-secondary-text block text-right font-normal">A partir de</span>}
            </span>
          </div>
          <p className="text-bm-secondary-text text-sm flex-grow mb-6 line-clamp-3">
            {product.description}
          </p>
          <button 
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 bg-bm-background hover:bg-bm-primary-accent hover:text-white text-bm-dark-accent font-bold py-3 px-4 rounded-xl transition-all border border-bm-border hover:border-transparent active:scale-95"
          >
            <Plus size={18} />
            {product.available_sizes || product.customizations ? 'Personalizar' : 'Adicionar'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ProductModal 
            product={product} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
