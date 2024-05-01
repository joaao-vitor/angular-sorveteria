import { MenuUserDropdownComponent } from './../menu-user-dropdown/menu-user-dropdown.component';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../interfaces/menuItem.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { ProductCartService } from '../../services/product-cart.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MenuUserDropdownComponent,
        MatBadgeModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    @Input('menuItems') menuItems!: Array<MenuItem>;
    @Output() cartBtnEvent = new EventEmitter();

    constructor(private cartService: ProductCartService) {}

    countCart() {
        return this.cartService.getCount();
    }
    openCart() {
        this.cartBtnEvent.emit();
    }
}
