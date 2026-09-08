import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';

export function Header() {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Cardápio', href: '#cardapio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-bm-surface shadow-sm py-3' : 'bg-bm-background py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#inicio" className="font-logo font-bold text-2xl tracking-tight text-bm-dark-accent">
              Brasa <span className="text-bm-primary-accent">&</span> Massa
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-bm-secondary-text hover:text-bm-primary-accent font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="hidden md:flex items-center gap-2 bg-bm-primary-accent hover:bg-opacity-90 text-white px-4 py-2 rounded-full transition-all active:scale-95"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bm-dark-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-medium">
                {totalItems > 0 ? formatCurrency(subtotal) : 'Carrinho'}
              </span>
            </button>
            <button 
              className="md:hidden p-2 text-bm-dark-accent active:bg-bm-soft-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bm-surface border-t border-bm-border shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-base font-medium text-bm-primary-text border-b border-bm-border last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
