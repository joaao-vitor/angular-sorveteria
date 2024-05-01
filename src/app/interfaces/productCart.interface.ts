import { Product } from './product.interface';
import { v4 } from 'uuid';

export interface ProductCart {
    id?: string;
    product: Product;
    quantity?: number;
    pickedFlavors: string[];
    pickedAditionals: string[];
}
