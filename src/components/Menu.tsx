import React, { useState, useMemo } from 'react';
import { menuData } from '../data';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Frown } from 'lucide-react';

export function MenuSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return menuData;
    const lowerSearch = searchTerm.toLowerCase();
    return menuData.map(category => ({
      ...category,
      products: category.products.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.description.toLowerCase().includes(lowerSearch)
      )
    })).filter(category => category.products.length > 0);
  }, [searchTerm]);

  const hasResults = filteredCategories.length > 0;

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-bm-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-bm-dark-accent mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-lg text-bm-secondary-text">
            Adicione seus produtos ao carrinho e monte o pedido do seu jeito.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-bm-secondary-text group-focus-within:text-bm-primary-accent transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar por pizza, hambúrguer, ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-bm-border rounded-full py-4 pl-12 pr-6 text-bm-primary-text shadow-sm focus:outline-none focus:ring-2 focus:ring-bm-primary-accent focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {/* Quick Categories Navigation (Mobile Horizontal Scroll) */}
        {!searchTerm && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center pb-4 mb-10 gap-3"
          >
            {menuData.map(category => (
              <a 
                key={`nav-${category.id}`}
                href={`#cat-${category.id}`}
                className="whitespace-nowrap flex-shrink-0 bg-white border border-bm-border px-5 py-2.5 rounded-full font-bold text-bm-dark-accent hover:border-bm-primary-accent hover:text-bm-primary-accent hover:shadow-md transition-all snap-start text-sm sm:text-base flex items-center justify-center"
              >
                {category.name}
              </a>
            ))}
          </motion.div>
        )}

        {/* Categories & Products */}
        <div className="space-y-16 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {hasResults ? (
              filteredCategories.map(category => (
                <motion.div 
                  key={category.id} 
                  id={`cat-${category.id}`} 
                  className="scroll-mt-32"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                >
                  <h3 className="text-3xl font-heading font-bold text-bm-dark-accent mb-8 pb-4 border-b border-bm-border flex items-center gap-3">
                    {category.name}
                    <span className="text-sm bg-bm-soft-accent/50 text-bm-primary-accent py-1 px-3 rounded-full font-heading font-bold">
                      {category.products.length}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                      {category.products.map(product => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="bg-bm-surface w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Frown size={48} className="text-bm-border" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-bm-dark-accent mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-bm-secondary-text">
                  Não encontramos nada com "{searchTerm}".<br />Tente buscar por outro termo.
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-6 px-6 py-2 border border-bm-primary-accent text-bm-primary-accent rounded-full font-bold hover:bg-bm-primary-accent hover:text-white transition-colors"
                >
                  Limpar busca
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
