import { CartItem, CustomerData } from './types';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const generateWhatsAppLink = (
  cartItems: CartItem[],
  customer: CustomerData,
  subtotal: number,
  deliveryFee: number
) => {
  const phone = '5531998647703';
  const total = subtotal + deliveryFee;

  let message = `*NOVO PEDIDO | Brasa & Massa* \u{1F354}\u{1F355}\n\n`;
  
  message += `*DADOS DO CLIENTE*\n`;
  message += `\u{1F464} Nome: ${customer.name}\n\n`;
  
  message += `*ITENS DO PEDIDO*\n`;
  cartItems.forEach(item => {
    message += `\u{1F538} *${item.quantity}x ${item.name}*`;
    if (item.size) message += ` (${item.size})`;
    message += ` - ${formatCurrency(item.finalPrice * item.quantity)}\n`;
    
    if (item.extras && item.extras.length > 0) {
      message += `   \u2795 Adicionais: ${item.extras.join(', ')}\n`;
    }
    if (item.observation) {
      message += `   \u{1F4DD} Obs: ${item.observation}\n`;
    }
  });
  
  message += `\n*RECEBIMENTO*\n`;
  if (customer.orderType === 'Entrega') {
    message += `\u{1F6F5} Tipo: ${customer.orderType}\n`;
    message += `\u{1F4CD} Endereço: ${customer.address}, ${customer.addressNumber}\n`;
    message += `   Bairro: ${customer.neighborhood}\n`;
    if (customer.addressComplement) {
      message += `   Complemento: ${customer.addressComplement}\n`;
    }
  } else {
    message += `\u{1F6CD}\uFE0F Tipo: Retirada no balcão\n`;
  }
  
  message += `\n*PAGAMENTO*\n`;
  message += `\u{1F4B5} Forma: ${customer.paymentMethod}\n`;
  if (customer.paymentMethod === 'Dinheiro' && customer.changeFor) {
    message += `   Troco para: R$ ${customer.changeFor}\n`;
  }
  
  if (customer.generalObservation) {
    message += `\n*OBSERVAÇÃO GERAL*\n`;
    message += `\u26A0\uFE0F ${customer.generalObservation}\n`;
  }
  
  message += `\n*RESUMO DOS VALORES*\n`;
  message += `Subtotal: ${formatCurrency(subtotal)}\n`;
  if (customer.orderType === 'Entrega') {
    message += `Taxa de entrega: ${formatCurrency(deliveryFee)}\n`;
  }
  message += `*TOTAL A PAGAR: ${formatCurrency(total)}*\n\n`;
  
  message += `Obrigado pela preferência! Aguardo a confirmação do pedido.`;

  // Fallback API para dispositivos problemáticos
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
};
