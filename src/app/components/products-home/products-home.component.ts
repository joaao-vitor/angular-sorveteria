import { Component, OnInit, inject } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-products-home',
    standalone: true,
    imports: [
        SlickCarouselModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        ProductCardComponent,
        RouterLink,
    ],
    templateUrl: './products-home.component.html',
    styleUrl: './products-home.component.scss',
})
export class ProductsHomeComponent implements OnInit {
    products: Product[] = [];
    productService = inject(ProductService);

    constructor(private responsive: BreakpointObserver) {}
    ngOnInit(): void {
        this.adjustResponsive();
        this.initiateProducts();
    }
    private adjustResponsive() {
        this.responsive
            .observe([
                Breakpoints.TabletPortrait,
                Breakpoints.HandsetPortrait,
                Breakpoints.WebLandscape,
            ])
            .subscribe((result) => {
                console.log(Breakpoints);
                const breakpoints = result.breakpoints;
                if (breakpoints[Breakpoints.HandsetPortrait]) {
                    this.slideConfig.slidesToShow = 1;
                } else if (breakpoints[Breakpoints.TabletPortrait])
                    this.slideConfig.slidesToShow = 2;
                else if (breakpoints[Breakpoints.WebLandscape])
                    this.slideConfig.slidesToShow = 3;
            });
    }
    private initiateProducts() {
        this.productService.getAll().subscribe((data: Product[]) => {
            this.products = data;
        });
    }

    slideConfig = { slidesToShow: 3, slidesToScroll: 1 };
}
