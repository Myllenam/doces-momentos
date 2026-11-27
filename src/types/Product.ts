import type { ImageSourcePropType } from 'react-native';

export type ProductCategory =
  | 'Brigadeiros'
  | 'Brownies'
  | 'Bolos'
  | 'Outros';

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: ProductCategory;
  emoji: string;
  imagem?: ImageSourcePropType;
}
