import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export function MobileCartBar() {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="md:hidden fixed bottom-4 left-4 right-4 z-40"
        >
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-bm-primary-accent text-white font-bold py-4 px-6 rounded-full flex items-center justify-between active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-bm-dark-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              </div>
              <span>Ver Carrinho</span>
            </div>
            <span>{formatCurrency(subtotal)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
