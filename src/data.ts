import { Category } from './types';

export const menuData: Category[] = [
  {
    id: "pizzas",
    name: "Pizzas",
    products: [
      {
        id: "pizza-calabresa",
        name: "Pizza de Calabresa",
        description: "Molho de tomate, muçarela, calabresa fatiada e cebola.",
        price: 42.9,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        available_sizes: [
          { name: "Média", price: 42.9 },
          { name: "Grande", price: 54.9 }
        ],
        customizations: ["Sem cebola", "Borda recheada"]
      },
      {
        id: "pizza-frango-catupiry",
        name: "Frango com Catupiry",
        description: "Frango desfiado, muçarela, catupiry e orégano.",
        price: 46.9,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "pizza-marguerita",
        name: "Margherita",
        description: "Molho de tomate, muçarela, tomate, manjericão e azeite.",
        price: 44.9,
        image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "pizza-quatro-queijos",
        name: "Quatro Queijos",
        description: "Muçarela, provolone, parmesão e gorgonzola.",
        price: 49.9,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "pizza-vegana",
        name: "Pizza Vegana",
        description: "Massa de fermentação natural, queijo de castanhas, abobrinha, berinjela, tomate cereja e orégano.",
        price: 48.9,
        image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "hamburgueres",
    name: "Hambúrgueres",
    products: [
      {
        id: "brasa-classic",
        name: "Brasa Classic",
        description: "Pão brioche, hambúrguer artesanal de smash beef, queijo cheddar, cebola caramelizada e molho da casa.",
        price: 29.9,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "brasa-bacon",
        name: "Brasa Bacon",
        description: "Pão brioche, hambúrguer artesanal, cheddar, bacon crocante, alface e molho especial.",
        price: 34.9,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "brasa-duplo",
        name: "Brasa Duplo",
        description: "Dois hambúrgueres artesanais, queijo cheddar, cebola crispy e molho da casa.",
        price: 39.9,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "brasa-frango",
        name: "Brasa Chicken",
        description: "Pão brioche, filé de frango empanado, queijo, alface e maionese temperada.",
        price: 31.9,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "brasa-vegano",
        name: "Brasa Vegano",
        description: "Pão artesanal sem leite, hambúrguer de grão-de-bico e cogumelos, queijo vegano, alface, tomate e maionese vegetal.",
        price: 32.9,
        image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "combos",
    name: "Combos",
    products: [
      {
        id: "combo-classic",
        name: "Combo Classic",
        description: "Brasa Classic, batata frita e refrigerante lata.",
        price: 39.9,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "combo-bacon",
        name: "Combo Bacon",
        description: "Brasa Bacon, batata frita e refrigerante lata.",
        price: 44.9,
        image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "combo-pizza",
        name: "Combo Pizza",
        description: "Pizza média de calabresa ou margherita e duas bebidas em lata.",
        price: 54.9,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "combo-vegano",
        name: "Combo Vegano",
        description: "Brasa Vegano, batata rústica assada e suco natural.",
        price: 42.9,
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "vegano",
    name: "Vegano",
    products: [
      {
        id: "pizza-vegana-2",
        name: "Pizza Vegana",
        description: "Massa de fermentação natural, queijo de castanhas, abobrinha, berinjela, tomate cereja e orégano.",
        price: 48.9,
        image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "brasa-vegano-2",
        name: "Brasa Vegano",
        description: "Pão artesanal sem leite, hambúrguer de grão-de-bico e cogumelos, queijo vegano, alface, tomate e maionese vegetal.",
        price: 32.9,
        image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "combo-vegano-2",
        name: "Combo Vegano",
        description: "Brasa Vegano, batata rústica assada e suco natural.",
        price: 42.9,
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas",
    products: [
      {
        id: "coca-lata",
        name: "Coca-Cola Lata",
        description: "Refrigerante lata de 350 ml.",
        price: 6.0,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "guarana-lata",
        name: "Guaraná Lata",
        description: "Refrigerante lata de 350 ml.",
        price: 6.0,
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "agua",
        name: "Água Mineral",
        description: "Garrafa de 500 ml.",
        price: 4.0,
        image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "suco",
        name: "Suco Natural",
        description: "Suco natural do dia, 300 ml.",
        price: 8.0,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];
