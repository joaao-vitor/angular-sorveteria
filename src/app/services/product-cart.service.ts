import { Injectable } from '@angular/core';
import { ProductCart } from '../interfaces/productCart.interface';
import { v4 } from 'uuid';
@Injectable({
    providedIn: 'root',
})
export class ProductCartService {
    products: ProductCart[] = [];
    constructor() {
        this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    }
    getCount() {
        return this.products.length;
    }

    clear() {
        this.products = [];
        this.updateLocalStorage();
    }

    getAll() {
        return this.products;
    }
    getSingle(id: string) {
        return this.products.filter((p) => p.id === id);
    }
    add(product: ProductCart) {
        this.products.push({
            id: v4(),
            ...product,
            quantity: product.quantity || 1,
        });
        this.updateLocalStorage();
    }
    remove(id: string) {
        this.products = this.products.filter((p) => p.id !== id);
        this.updateLocalStorage();
    }
    increase(id: string) {
        this.products = this.products.map((p) => {
            if (p.id === id) {
                p.quantity && p.quantity > 0 ? p.quantity++ : (p.quantity = 1);
            }
            return p;
        });
        this.updateLocalStorage();
    }
    decrease(id: string) {
        let deleteFlag = false;
        this.products = this.products.map((p) => {
            if (p.id === id) {
                if (p.quantity && p.quantity === 1) {
                    deleteFlag = true;
                } else {
                    p.quantity && p.quantity > 0
                        ? p.quantity--
                        : (p.quantity = 1);
                }
            }
            return p;
        });
        if (deleteFlag) this.remove(id);
        else this.updateLocalStorage();
    }

    private updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.products));
    }
}
