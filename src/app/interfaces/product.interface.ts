export interface Product {
    id: string;
    title: string;
    weight: number;
    measurementUnit: string;
    flavors: Array<string>;
    maxFlavors: number;
    aditionals: Array<string>;
    maxAditionals: number;
    img: string;
    price: number;
}
