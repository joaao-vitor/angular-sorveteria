import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCart } from '../../interfaces/productCart.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductCartService } from '../../services/product-cart.service';

@Component({
    selector: 'app-product-card-cart',
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatButtonModule],
    templateUrl: './product-card-cart.component.html',
    styleUrl: './product-card-cart.component.scss',
})
export class ProductCardCartComponent {
    @Input({ required: true }) productCart!: ProductCart;
    @Output() refreshProducts = new EventEmitter();
    constructor(private cartService: ProductCartService) {}
    increase(product: ProductCart) {
        if (product.id) this.cartService.increase(product.id);
    }

    decrease(product: ProductCart) {
        if (product.id) this.cartService.decrease(product.id);
        if (product.quantity === 1) this.refreshProducts.emit();
    }
}
