import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ProductCardAdminComponent } from '../../components/product-card-admin/product-card-admin.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-panel-products',
    standalone: true,
    imports: [
        MatIconModule,
        ProductCardAdminComponent,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        RouterLink
    ],
    templateUrl: './panel-products.component.html',
    styleUrl: './panel-products.component.scss',
})
export class PanelProductsComponent implements OnInit {
    products: Product[] = [];
    shownProducts: Product[] = [];
    constructor(
        private productService: ProductService,
        private snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {
        this.fetchProducts();
    }
    applyFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.shownProducts = this.products.filter((product) =>
            product.title.toLowerCase().startsWith(value)
        );
    }
    private async fetchProducts() {
        this.products = await lastValueFrom(this.productService.getAll());
        this.shownProducts = [...this.products];
    }

    async deleteProduct(productId: string) {
        try {
            await firstValueFrom(this.productService.remove(productId));
            this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
                panelClass: 'success-msg',
                duration: 3000,
            });
        } catch (error) {
            this.snackBar.open(
                'Um erro ocorreu enquanto excluia o produto!',
                'Fechar',
                {
                    panelClass: 'error-msg',
                    duration: 3000,
                }
            );
        }
        await this.fetchProducts();
    }
}
