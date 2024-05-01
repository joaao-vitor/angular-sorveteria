import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private httpClient: HttpClient) {}
    private API_URL: string = `${environment.apiUrl}/products`;
    getAll(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.API_URL);
    }

    getSingle(id: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.API_URL}/${id}`);
    }

    create(product: Product): Observable<Product> {
        return this.httpClient.post<Product>(`${this.API_URL}/`, product);
    }
    edit(product: Product): Observable<Product> {
        console.log(product);
        return this.httpClient.put<Product>(
            `${this.API_URL}/${product.id}`,
            product
        );
    }

    remove(id: string): Observable<Product> {
        return this.httpClient.delete<Product>(`${this.API_URL}/${id}`);
    }
}
