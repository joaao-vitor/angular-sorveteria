import { Component } from '@angular/core';
import { HeroHomeComponent } from '../../components/hero-home/hero-home.component';
import { ProductsHomeComponent } from '../../components/products-home/products-home.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroHomeComponent, ProductsHomeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    
}
