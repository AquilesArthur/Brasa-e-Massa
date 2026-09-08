import React from 'react';
import { MapPin, Phone, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <>
      {/* Sobre Section */}
      <section id="sobre" className="py-20 md:py-32 bg-bm-surface border-y border-bm-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80"
                alt="Massa fresca sendo preparada"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-2 bg-bm-background text-bm-primary-accent text-sm font-bold uppercase tracking-widest rounded-full border border-bm-border">
                Nossa Essência
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-bm-dark-accent leading-tight">
                Sabor que <span className="text-bm-primary-accent">conecta</span> pessoas.
              </h2>
              <p className="text-lg md:text-xl text-bm-secondary-text leading-relaxed font-medium">
                Na Brasa & Massa, acreditamos que a comida de verdade tem o poder de criar memórias. Preparamos nossas pizzas e hambúrgueres artesanais com ingredientes frescos, receitas de família e aquele cuidado especial em cada detalhe.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contato" className="bg-bm-dark-accent text-bm-surface pt-20 pb-8 border-t-4 border-bm-primary-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-1 space-y-6">
               <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-bm-primary-accent text-white flex items-center justify-center font-logo font-black text-3xl rounded-xl">
                  B
                </div>
                <span className="font-logo font-extrabold text-3xl tracking-tight text-white">
                  Brasa<span className="text-bm-primary-accent">&</span>Massa
                </span>
              </div>
              <p className="text-bm-border/70 text-base leading-relaxed">
                Artesanal, fresco e feito com paixão. O verdadeiro sabor da nossa cozinha para a sua mesa.
              </p>
            </div>

            {/* Redes e Contato */}
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-xl text-white">Contato</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://wa.me/5531999999999" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-bm-border/80 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <MessageCircle size={18} />
                    </div>
                    <span className="font-medium">WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+5531999999999" className="flex items-center gap-3 text-bm-border/80 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-bm-primary-accent group-hover:text-white transition-colors">
                      <Phone size={18} />
                    </div>
                    <span className="font-medium">(31) 9999-9999</span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-bm-border/80 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                      <Instagram size={18} />
                    </div>
                    <span className="font-medium">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Endereço */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="font-heading font-bold text-xl text-white">Onde Estamos</h4>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-bm-primary-accent shrink-0 mt-1">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-white font-medium text-lg mb-1">Rua Fictícia, 123</p>
                    <p className="text-bm-border/70">Centro, Belo Horizonte - MG</p>
                    <p className="text-bm-border/70 mt-1">CEP: 30100-000</p>
                  </div>
                </div>
                <a 
                  href="https://maps.google.com/?q=Rua+Fictícia,+123+-+Centro,+Belo+Horizonte+-+MG" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white text-bm-dark-accent font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink size={20} />
                  Abrir no Google Maps
                </a>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-bm-border/50">
            <p>© {new Date().getFullYear()} Brasa & Massa. Todos os direitos reservados.</p>
            <div className="flex gap-6 font-medium">
              <a href="#inicio" className="hover:text-bm-primary-accent transition-colors">Início</a>
              <a href="#cardapio" className="hover:text-bm-primary-accent transition-colors">Cardápio</a>
              <a href="#sobre" className="hover:text-bm-primary-accent transition-colors">Sobre</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
