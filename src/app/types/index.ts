export interface Rating {
  id: number;
  user: string;
  avatar: string;
  stars: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  images: string[];
  description: string;
  condition: string;
  size: string;
  quality: string;
  dateListed: string;
  category: string;
  subCategory?: string;
  ratings: Rating[];
}

export type ViewState =
  | { type: 'home' }
  | { type: 'category'; category: string }
  | { type: 'subcategory'; category: string; subcategory: string }
  | { type: 'product'; product: Product };