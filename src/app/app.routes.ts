import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { PanelProductsComponent } from './pages/panel-products/panel-products.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'add-product/:id', component: AddProductComponent },
    { path: 'panel-products', component: PanelProductsComponent },
    { path: 'products', component: ProductsComponent },
];
