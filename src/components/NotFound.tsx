import React from 'react';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-bm-background text-bm-primary-text font-body">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="max-w-lg mx-auto space-y-6"
        >
          <h1 className="text-[8rem] leading-none font-heading font-extrabold text-bm-primary-accent drop-shadow-sm">404</h1>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-bm-dark-accent">
            Página não encontrada
          </h2>
          <p className="text-lg text-bm-secondary-text pb-6 font-medium">
            Parece que você se perdeu no cardápio. A página que você está procurando não existe ou foi movida.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-bm-primary-accent text-white px-8 py-4 rounded-full font-bold hover:bg-bm-dark-accent transition-all hover:-translate-y-1 shadow-lg shadow-bm-primary-accent/20"
          >
            <Home size={20} />
            Voltar ao Início
          </a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
