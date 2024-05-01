import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../interfaces/product.interface';
import { lastValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [ProductCardComponent, MatFormFieldModule, MatInputModule, MatIconModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    shownProducts: Product[] = [];
    constructor(private productService: ProductService) {}
    async ngOnInit(): Promise<void> {
        this.products = await lastValueFrom(this.productService.getAll());
        this.shownProducts = this.products;
    }

    applyFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.shownProducts = this.products.filter((p) =>
            p.title.toLowerCase().startsWith(value)
        );
    }
}
