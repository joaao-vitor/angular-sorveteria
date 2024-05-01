import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuUserDropdownComponent } from '../menu-user-dropdown/menu-user-dropdown.component';
import { MenuItem } from '../../interfaces/menuItem.interface';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductCartService } from '../../services/product-cart.service';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [
        MatSidenavModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MenuUserDropdownComponent,
        RouterLink,
        MatBadgeModule,
    ],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
    @Input({ required: true }) menuItems!: MenuItem[];
    @Output() closeEvent = new EventEmitter();
    @Output() openCartEvent = new EventEmitter();
    constructor(private cartService: ProductCartService) {}
    close() {
        this.closeEvent.emit();
    }
    countCart() {
        return this.cartService.getCount();
    }

    openCart() {
        this.openCartEvent.emit();
    }
}
