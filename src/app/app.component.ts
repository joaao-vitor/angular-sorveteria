import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MenuItem } from './interfaces/menuItem.interface';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProductsCartComponent } from './components/products-cart/products-cart.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        HomeComponent,
        HeaderComponent,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        SidenavComponent,
        ProductsCartComponent,
    ],
})
export class AppComponent {
    @ViewChild('cart') cartBar!: MatDrawer;
    @ViewChild('sidenav') sidenav!: MatDrawer;

    title = 'sorveteria';
    menuItems: MenuItem[] = [
        {
            title: 'home',
            icon: 'home',
            url: '/',
        },
        {
            title: 'produtos',
            icon: 'inventory_2',
            url: '/products',
        },
        {
            title: 'onde tem?',
            icon: 'location_on',
            url: '/',
        },
        {
            title: 'sobre nós',
            icon: 'help',
            url: '/',
        },
    ];

    openCart() {
        this.sidenav.toggle();
        this.cartBar.toggle();
    }
}
