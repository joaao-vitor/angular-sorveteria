import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-card-admin',
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
    templateUrl: './product-card-admin.component.html',
    styleUrl: './product-card-admin.component.scss',
})
export class ProductCardAdminComponent {
    @Input({ required: true }) product!: Product;
    @Output() deleteEvent = new EventEmitter<string>();

    deleteProduct() {
        this.deleteEvent.emit(this.product.id);
    }
}
