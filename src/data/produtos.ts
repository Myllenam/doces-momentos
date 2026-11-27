
import type { Product } from '../types/Product';

export const produtos: Product[] = [
  {
    id: '1',
    nome: 'Brigadeiro Gourmet',
    descricao:
      'Brigadeiro artesanal feito com chocolate de qualidade, coberto com granulado belga.',
    preco: 5,
    categoria: 'Brigadeiros',
    emoji: '🍫',
  },
  {
    id: '2',
    nome: 'Brigadeiro de Pistache',
    descricao:
      'Brigadeiro cremoso com sabor de pistache e cobertura especial.',
    preco: 7,
    categoria: 'Brigadeiros',
    emoji: '💚',
  },
  {
    id: '3',
    nome: 'Brownie de Chocolate',
    descricao:
      'Brownie de chocolate com casquinha crocante e interior macio.',
    preco: 12,
    categoria: 'Brownies',
    emoji: '🍫',
  },
  {
    id: '4',
    nome: 'Brownie com Nutella',
    descricao:
      'Brownie artesanal com uma deliciosa cobertura de creme de avelã.',
    preco: 16,
    categoria: 'Brownies',
    emoji: '🍫',
  },
  {
    id: '5',
    nome: 'Bolo de Pote de Ninho',
    descricao:
      'Camadas de massa fofinha com recheio cremoso de leite Ninho.',
    preco: 15,
    categoria: 'Bolos',
    emoji: '🍰',
  },
  {
    id: '6',
    nome: 'Bolo de Pote de Morango',
    descricao:
      'Bolo de pote com creme suave e deliciosos morangos.',
    preco: 14,
    categoria: 'Bolos',
    emoji: '🍓',
  },
];

export const categorias = [
  'Todos',
  'Brigadeiros',
  'Brownies',
  'Bolos',
  'Outros',
] as const;

export type CategoryFilter = (typeof categorias)[number];

export const buscarProdutoPorId = (id: string) =>
  produtos.find((produto) => produto.id === id);
