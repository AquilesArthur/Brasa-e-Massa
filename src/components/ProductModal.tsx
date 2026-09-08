import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.available_sizes?.[0]?.name || '');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [observation, setObservation] = useState('');

  const currentSizeObj = product.available_sizes?.find(s => s.name === selectedSize);
  const basePrice = currentSizeObj ? currentSizeObj.price : product.price;
  
  const finalPrice = basePrice;
  const total = finalPrice * quantity;

  const handleToggleExtra = (extra: string) => {
    setSelectedExtras(prev => 
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      basePrice: basePrice,
      finalPrice: finalPrice,
      quantity,
      image: product.image,
      size: selectedSize || undefined,
      extras: selectedExtras,
      observation: observation.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-bm-surface rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative z-10 mt-auto sm:mt-0"
      >
        
        {/* Mobile Pull Indicator */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden absolute top-0 z-20">
          <div className="w-12 h-1.5 bg-white/40 rounded-full"></div>
        </div>

        {/* Header Image */}
        <div className="h-40 sm:h-48 relative flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-bm-dark-accent transition-colors z-20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-bm-dark-accent mb-2">{product.name}</h2>
            <p className="text-bm-secondary-text text-sm sm:text-base leading-relaxed">{product.description}</p>
          </div>

          {/* Sizes */}
          {product.available_sizes && (
            <div className="space-y-3">
              <h3 className="font-bold text-bm-dark-accent">Escolha o tamanho</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.available_sizes.map(size => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-3 sm:p-4 rounded-xl border text-left transition-all active:scale-[0.98] ${
                      selectedSize === size.name 
                        ? 'border-bm-primary-accent bg-bm-primary-accent/5 ring-1 ring-bm-primary-accent shadow-sm'
                        : 'border-bm-border hover:border-bm-secondary-text bg-white'
                    }`}
                  >
                    <span className="block font-bold text-bm-dark-accent">{size.name}</span>
                    <span className="text-sm text-bm-secondary-text">{formatCurrency(size.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customizations */}
          {product.customizations && (
            <div className="space-y-3">
              <h3 className="font-bold text-bm-dark-accent">Personalize seu pedido</h3>
              <div className="space-y-2">
                {product.customizations.map(extra => (
                  <label key={extra} className="flex items-center justify-between p-4 rounded-xl border border-bm-border cursor-pointer active:bg-bm-background hover:border-bm-primary-accent bg-white transition-all select-none">
                    <span className="text-bm-primary-text font-medium text-sm sm:text-base">{extra}</span>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded border-bm-border text-bm-primary-accent focus:ring-bm-primary-accent"
                      checked={selectedExtras.includes(extra)}
                      onChange={() => handleToggleExtra(extra)}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Observations */}
          <div className="space-y-3">
            <h3 className="font-bold text-bm-dark-accent">Alguma observação?</h3>
            <textarea 
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Ex: Tirar cebola, ponto da carne..."
              className="w-full border border-bm-border rounded-xl p-4 bg-white focus:outline-none focus:ring-2 focus:ring-bm-primary-accent text-bm-primary-text resize-none h-24 shadow-sm text-sm sm:text-base"
            ></textarea>
          </div>
          
          {/* Bottom spacing for mobile to ensure scroll clears the fixed footer */}
          <div className="h-4 sm:hidden"></div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-bm-border bg-bm-background flex flex-row gap-3 sm:gap-4 items-center flex-shrink-0 safe-area-bottom pb-6 sm:pb-5">
          <div className="flex items-center justify-between border border-bm-border rounded-xl p-1 bg-white shadow-sm flex-shrink-0">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 sm:p-4 text-bm-dark-accent hover:bg-bm-surface rounded-lg transition-colors active:scale-95"
            >
              <Minus size={20} />
            </button>
            <span className="font-bold text-lg px-2 sm:px-4 w-10 sm:w-12 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 sm:p-4 text-bm-dark-accent hover:bg-bm-surface rounded-lg transition-colors active:scale-95"
            >
              <Plus size={20} />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-bm-primary-accent text-white font-bold py-4 sm:py-5 px-4 sm:px-6 rounded-xl hover:bg-opacity-90 transition-colors flex justify-between items-center active:scale-95 text-sm sm:text-base"
          >
            <span>Adicionar</span>
            <span>{formatCurrency(total)}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
