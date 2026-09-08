import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-bm-dark-accent pt-24 md:pt-28">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80" 
          alt="Pizzas e Hambúrgueres Brasa & Massa" 
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay + blur for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[3px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center text-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-extrabold text-white tracking-tight leading-[1.05] drop-shadow-2xl mb-6 md:mb-8">
            Massa artesanal & <br className="hidden sm:block" />
            <span className="text-bm-warm-accent">Hambúrguer na brasa.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-medium px-4 drop-shadow-xl mb-10 md:mb-12">
            Pizzas artesanais e hambúrgueres perfeitos, com ingredientes frescos.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center px-4 sm:px-0">
            <a 
              href="#cardapio" 
              className="inline-flex items-center justify-center gap-2 bg-bm-primary-accent text-white px-10 py-4 sm:py-5 rounded-full font-bold text-lg hover:bg-bm-primary-accent/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-xl"
            >
              Ver Cardápio
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
