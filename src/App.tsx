import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/Menu';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { NotFound } from './components/NotFound';
import { MobileCartBar } from './components/MobileCartBar';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Simulate initial loading sequence for aesthetic purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <CartProvider>
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen flex flex-col bg-bm-background text-bm-primary-text font-body selection:bg-bm-primary-accent selection:text-white pb-24 md:pb-0"
        >
          <Header />
          
          <main className="flex-1">
            <Hero />
            <MenuSection />
          </main>
          <Footer />
          
          {/* Overlay Components */}
          <MobileCartBar />
          <CartDrawer />
          <CheckoutModal />
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
}

