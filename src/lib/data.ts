import { Product } from './types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Berg Mountain Pro 29"',
    price: 2899.99,
    image: 'https://images.unsplash.com/photo-1544191696-15693072e0b5?w=400&h=400&fit=crop',
    category: 'mountain',
    description: 'Mountain bike profissional com suspensão full e quadro de carbono para trilhas extremas',
    rating: 4.9,
    inStock: true
  },
  {
    id: '2',
    name: 'Berg Road Speed Carbon',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'road',
    description: 'Bike de estrada ultra-leve com quadro de carbono e componentes Shimano Ultegra',
    rating: 4.8,
    inStock: true
  },
  {
    id: '3',
    name: 'Berg Urban Hybrid',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop',
    category: 'hybrid',
    description: 'Bicicleta híbrida perfeita para cidade e lazer, com design moderno e conforto',
    rating: 4.6,
    inStock: true
  },
  {
    id: '4',
    name: 'Berg E-Bike Power',
    price: 4299.99,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop',
    category: 'electric',
    description: 'Bicicleta elétrica com bateria de longa duração e motor potente para qualquer terreno',
    rating: 4.7,
    inStock: true
  },
  {
    id: '5',
    name: 'Berg Trail Master',
    price: 2199.99,
    image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=400&fit=crop',
    category: 'mountain',
    description: 'Mountain bike intermediária com suspensão dianteira e freios a disco hidráulicos',
    rating: 4.5,
    inStock: false
  },
  {
    id: '6',
    name: 'Berg Kids Adventure 20"',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=400&fit=crop',
    category: 'kids',
    description: 'Bicicleta infantil segura e divertida com design colorido e componentes de qualidade',
    rating: 4.8,
    inStock: true
  },
  {
    id: '7',
    name: 'Berg Road Classic',
    price: 2599.99,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
    category: 'road',
    description: 'Bike de estrada clássica com quadro de alumínio e componentes Shimano 105',
    rating: 4.4,
    inStock: true
  },
  {
    id: '8',
    name: 'Berg E-Mountain Explorer',
    price: 5199.99,
    image: 'https://images.unsplash.com/photo-1544191696-15693072e0b5?w=400&h=400&fit=crop',
    category: 'electric',
    description: 'Mountain bike elétrica premium com suspensão full e tecnologia de ponta',
    rating: 4.9,
    inStock: true
  },
  {
    id: '9',
    name: 'Berg City Comfort',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop',
    category: 'hybrid',
    description: 'Bicicleta urbana com posição confortável e acessórios para o dia a dia',
    rating: 4.3,
    inStock: true
  },
  {
    id: '10',
    name: 'Berg Kids BMX Pro',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=400&fit=crop',
    category: 'kids',
    description: 'BMX infantil resistente para manobras e diversão com segurança',
    rating: 4.6,
    inStock: true
  }
]

export const categories = [
  { id: 'all', name: 'Todas as Bikes', count: products.length },
  { id: 'mountain', name: 'Mountain Bike', count: products.filter(p => p.category === 'mountain').length },
  { id: 'road', name: 'Speed/Estrada', count: products.filter(p => p.category === 'road').length },
  { id: 'hybrid', name: 'Urbana/Híbrida', count: products.filter(p => p.category === 'hybrid').length },
  { id: 'electric', name: 'E-Bikes', count: products.filter(p => p.category === 'electric').length },
  { id: 'kids', name: 'Infantil', count: products.filter(p => p.category === 'kids').length }
]