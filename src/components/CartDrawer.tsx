import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, subtotal, setIsCheckoutOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          ></motion.div>
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-bm-surface shadow-2xl flex flex-col"
          >
            
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-bm-border bg-bm-background">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-bm-dark-accent flex items-center gap-2">
                <ShoppingBag size={24} />
                Seu Carrinho
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-bm-secondary-text hover:bg-bm-border rounded-full transition-colors active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70 mt-12"
                  >
                    <ShoppingBag size={64} className="text-bm-secondary-text" />
                    <h3 className="font-bold text-xl text-bm-dark-accent">Seu carrinho está vazio</h3>
                    <p className="text-bm-secondary-text text-sm sm:text-base">Escolha seus favoritos e monte seu pedido.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-6 py-3 bg-bm-soft-accent text-bm-dark-accent font-bold rounded-xl active:scale-95 transition-transform"
                    >
                      Ver cardápio
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {items.map(item => (
                      <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="flex gap-3 sm:gap-4 border-b border-bm-border pb-6 last:border-0 last:pb-0"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-bm-dark-accent leading-tight text-sm sm:text-base">{item.name}</h4>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-bm-primary-accent hover:text-red-700 p-2 -mr-2 -mt-2 rounded-full active:bg-bm-soft-accent transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          {(item.size || item.extras.length > 0 || item.observation) && (
                            <div className="text-xs text-bm-secondary-text mt-1 space-y-1">
                              {item.size && <p>Tam: {item.size}</p>}
                              {item.extras.length > 0 && <p>Add: {item.extras.join(', ')}</p>}
                              {item.observation && <p className="italic">Obs: {item.observation}</p>}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 sm:gap-3 border border-bm-border rounded-lg px-2 py-1 bg-white">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-bm-dark-accent p-1 active:bg-bm-soft-accent rounded transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-bold text-sm w-4 sm:w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-bm-dark-accent p-1 active:bg-bm-soft-accent rounded transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <span className="font-bold text-bm-dark-accent text-sm sm:text-base">
                              {formatCurrency(item.finalPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-6 border-t border-bm-border bg-bm-background space-y-4 safe-area-bottom pb-6 sm:pb-6"
              >
                <div className="flex justify-between text-bm-secondary-text text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {/* Delivery fee is shown during checkout */}
                <div className="flex justify-between text-lg sm:text-xl font-bold text-bm-dark-accent">
                  <span>Total provisório</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-bm-primary-accent text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-colors active:scale-95"
                >
                  Continuar para Checkout
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
