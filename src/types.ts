export interface ProductSize {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available_sizes?: ProductSize[];
  customizations?: string[];
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export interface CartItem {
  id: string; // Unique ID for the cart entry (since same product can have different sizes/observations)
  productId: string;
  name: string;
  basePrice: number;
  finalPrice: number;
  quantity: number;
  image: string;
  size?: string;
  extras: string[];
  observation?: string;
}

export interface CustomerData {
  name: string;
  orderType: 'Entrega' | 'Retirada no local' | '';
  address: string;
  addressNumber: string;
  addressComplement: string;
  neighborhood: string;
  paymentMethod: 'Pix' | 'Cartão de crédito' | 'Cartão de débito' | 'Dinheiro' | '';
  changeFor: string;
  generalObservation: string;
}
