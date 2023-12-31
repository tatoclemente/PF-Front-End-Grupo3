export const dataDish = [
  {
    id: 1,
    name: "Ravioles de Jamón y Queso",
    description: "Ravioles caseros rellenos de jamón y queso",
    type: "plato principal",
    subtype: "pastas",
    disponible: true,
    price: 4000,
    calories: 500,
    glutenfree: false,
    vegetarian: false,
    plateoftheday: true,
  },
  {
    id: 2,
    name: "Ensalada Caprese",
    description: "Ensalada fresca con tomates, mozzarella y albahaca",
    type: "entrada",
    subtype: "ensaladas",
    disponible: true,
    price: 2500,
    calories: 300,
    glutenfree: true,
    vegetarian: true,
    plateoftheday: false,
  },
  {
    id: 3,
    name: "Milanesa Napolitana",
    description:
      "Jugosa milanesa de carne cubierta con salsa de tomate, jamón y queso",
    type: "plato principal",
    subtype: "carnes",
    disponible: true,
    price: 4500,
    calories: 800,
    glutenfree: false,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 4,
    name: "Ceviche de Camarón",
    description: "Delicioso ceviche de camarón marinado con limón y especias",
    type: "entrada",
    subtype: "pescados y mariscos",
    disponible: true,
    price: 3800,
    calories: 350,
    glutenfree: true,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 5,
    name: "Sopa de Cebolla",
    description: "Sabrosa sopa de cebolla caramelizada con crujientes crotones",
    type: "entrada",
    subtype: "sopas",
    disponible: true,
    price: 2800,
    calories: 200,
    glutenfree: true,
    vegetarian: true,
    plateoftheday: false,
  },
  {
    id: 6,
    name: "Lomo Saltado",
    description:
      "Tierno lomo de res salteado con cebolla, tomate y papas fritas",
    type: "plato principal",
    subtype: "carnes",
    disponible: true,
    price: 5200,
    calories: 700,
    glutenfree: true,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 7,
    name: "Pizza Margarita",
    description:
      "Clásica pizza margarita con salsa de tomate, mozzarella y albahaca fresca",
    type: "plato principal",
    subtype: "pizzas",
    disponible: true,
    price: 3800,
    calories: 600,
    glutenfree: false,
    vegetarian: true,
    plateoftheday: false,
  },
  {
    id: 8,
    name: "Carpaccio de Salmón",
    description:
      "Finas láminas de salmón marinadas con aceite de oliva, limón y eneldo",
    type: "entrada",
    subtype: "pescados y mariscos",
    disponible: true,
    price: 4200,
    calories: 250,
    glutenfree: true,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 9,
    name: "Lasagna de Verduras",
    description:
      "Lasagna vegetariana con capas de verduras, salsa de tomate y queso gratinado",
    type: "plato principal",
    subtype: "pastas",
    disponible: true,
    price: 3900,
    calories: 450,
    glutenfree: false,
    vegetarian: true,
    plateoftheday: false,
  },
  {
    id: 10,
    name: "Cazuela de Pollo",
    description:
      "Sabrosa cazuela de pollo con verduras, arroz y caldo de pollo",
    type: "plato principal",
    subtype: "carnes",
    disponible: true,
    price: 4600,
    calories: 550,
    glutenfree: true,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 11,
    name: "Sushi Variado",
    description:
      "Selección de sushi con diferentes tipos de pescado y mariscos",
    type: "plato principal",
    subtype: "pescados y mariscos",
    disponible: true,
    price: 5600,
    calories: 400,
    glutenfree: true,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 12,
    name: "Empanadas de Carne",
    description: "Deliciosas empanadas rellenas de carne molida y condimentos",
    type: "entrada",
    subtype: "aperitivos",
    disponible: true,
    price: 3200,
    calories: 300,
    glutenfree: false,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 13,
    name: "Risotto de Champiñones",
    description:
      "Risotto cremoso con champiñones salteados, vino blanco y parmesano",
    type: "plato principal",
    subtype: "arroces",
    disponible: true,
    price: 4200,
    calories: 550,
    glutenfree: true,
    vegetarian: true,
    plateoftheday: false,
  },
  {
    id: 14,
    name: "Ceviche Mixto",
    description: "Mezcla de mariscos frescos marinados con limón y especias",
    type: "entrada",
    subtype: "pescados y mariscos",
    disponible: true,
    price: 4400,
    calories: 320,
    glutenfree: true,
    vegetarian: false,
    plateoftheday: false,
  },
  {
    id: 15,
    name: "Tiramisú",
    description:
      "Clásico postre italiano con capas de bizcocho, café, crema mascarpone y cacao",
    type: "postre",
    subtype: "postres",
    disponible: true,
    price: 2800,
    calories: 400,
    glutenfree: false,
    vegetarian: true,
    plateoftheday: false,
  },
];

export const dataDrinks = [
  {
    id: 1,
    name: "Cerveza Lager",
    alcohol: true,
    gas: true,
    stock: 50,
    price: 2000,
    volume: 473,
    type: "cervezas",
  },
  {
    id: 2,
    name: "Cerveza IPA",
    alcohol: true,
    gas: true,
    stock: 30,
    price: 2500,
    volume: 473,
    type: "cervezas",
  },
  {
    id: 3,
    name: "Cerveza Sin Alcohol",
    alcohol: false,
    gas: true,
    stock: 20,
    price: 1800,
    volume: 473,
    type: "cervezas",
  },
  {
    id: 4,
    name: "Coca-Cola",
    alcohol: false,
    gas: true,
    stock: 100,
    price: 1200,
    volume: 500,
    type: "gaseosas",
  },
  {
    id: 5,
    name: "Sprite",
    alcohol: false,
    gas: true,
    stock: 80,
    price: 1200,
    volume: 500,
    type: "gaseosas",
  },
  {
    id: 6,
    name: "Vino Tinto",
    alcohol: true,
    gas: false,
    stock: 15,
    price: 3500,
    volume: 750,
    type: "vinos",
  },
  {
    id: 7,
    name: "Vino Blanco",
    alcohol: true,
    gas: false,
    stock: 10,
    price: 3200,
    volume: 750,
    type: "vinos",
  },
  {
    id: 8,
    name: "Agua Mineral con Gas",
    alcohol: false,
    gas: true,
    stock: 40,
    price: 1000,
    volume: 500,
    type: "aguas",
  },
  {
    id: 9,
    name: "Agua Mineral sin Gas",
    alcohol: false,
    gas: false,
    stock: 60,
    price: 1000,
    volume: 500,
    type: "aguas",
  },
  {
    id: 10,
    name: "Agua de Pera",
    alcohol: false,
    gas: false,
    stock: 25,
    price: 1500,
    volume: 500,
    type: "aguas",
  },
  {
    id: 11,
    name: "Cerveza Stout",
    alcohol: true,
    gas: true,
    stock: 35,
    price: 200,
    volume: 473,
    type: "cervezas",
  },
  {
    id: 12,
    name: "Pepsi",
    alcohol: false,
    gas: true,
    stock: 90,
    price: 100,
    volume: 500,
    type: "gaseosas",
  },
  {
    id: 13,
    name: "Vino Rosado",
    alcohol: true,
    gas: false,
    stock: 8,
    price: 3000,
    volume: 750,
    type: "vinos",
  },
  {
    id: 14,
    name: "Agua de Manzana",
    alcohol: false,
    gas: true,
    stock: 50,
    price: 1200,
    volume: 500,
    type: "aguas",
  },
  {
    id: 15,
    name: "Agua Tónica",
    alcohol: false,
    gas: true,
    stock: 40,
    price: 1500,
    volume: 500,
    type: "gaseosas",
  },
  {
    id: 16,
    name: "Vino Espumante",
    alcohol: true,
    gas: true,
    stock: 12,
    price: 4000,
    volume: 750,
    type: "vinos",
  },
  {
    id: 17,
    name: "Cerveza Amber Ale",
    alcohol: true,
    gas: true,
    stock: 28,
    price: 2500,
    volume: 473,
    type: "cervezas",
  },
  {
    id: 18,
    name: "Fanta Naranja",
    alcohol: false,
    gas: true,
    stock: 70,
    price: 1200,
    volume: 500,
    type: "gaseosas",
  },
  {
    id: 19,
    name: "Vino Santa Julia",
    alcohol: true,
    gas: false,
    stock: 8,
    price: 2800,
    volume: 750,
    type: "vinos",
  },
  {
    id: 20,
    name: "Agua de Naranja",
    alcohol: false,
    gas: true,
    stock: 30,
    price: 1300,
    volume: 500,
    type: "aguas",
  },
  {
    id: 21,
    name: "Vino Rutini Blanco",
    alcohol: true,
    gas: false,
    stock: 12,
    price: 5800,
    volume: 750,
    type: "vinos",
  },
];


export const sides = [
  {
    name: "salsa fileto",
    type: "salsas",
    available: true,
    price: 1000,
    image: null,
  },
  {
    name: "cuatro quesos",
    type: "salsas",
    available: true,
    price: 1000,
    image: null,
  },
  {
    name: "bolognesa",
    type: "salsas",
    available: true,
    price: 1000,
    image: null,
  },
  {
    name: "papas fritas",
    type: "acompañamientos",
    available: true,
    price: 1000,
    image: null,
  },
  {
    name: "pure de papas",
    type: "acompañamientos",
    available: true,
    price: 1000,
    image: null,
  },
  {
    name: "ensalada lechuga y tomate",
    type: "acompañamientos",
    available: true,
    price: 1000,
    image: null,
  },
  {
    name: "ensalada de tomate y huevo",
    type: "acompañamientos",
    available: true,
    price: 1000,
    image: null,
  },
];

