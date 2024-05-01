import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductCartService } from '../../services/product-cart.service';
import { ProductCart } from '../../interfaces/productCart.interface';
import { ProductCardCartComponent } from '../product-card-cart/product-card-cart.component';

@Component({
    selector: 'app-products-cart',
    standalone: true,
    imports: [MatListModule, MatIconModule, MatButtonModule, MatCardModule, ProductCardCartComponent],
    templateUrl: './products-cart.component.html',
    styleUrl: './products-cart.component.scss',
})
export class ProductsCartComponent implements OnInit {
    @Output() closeEvent = new EventEmitter();

    products: ProductCart[] = [];

    constructor(
        private cartService: ProductCartService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.products = this.cartService.getAll();
    }
    clearCart() {
        this.cartService.clear();
        this.products = this.cartService.getAll();
        this.snackbar.open('Carrinho limpo com sucesso', 'Fechar', {
            duration: 3000,
        });
    }
    close() {
        this.closeEvent.emit();
    }

    refresh() {
        this.products = this.cartService.getAll();
    }
}
