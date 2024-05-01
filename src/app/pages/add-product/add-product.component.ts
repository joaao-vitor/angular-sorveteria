import { Product } from './../../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
    MatChipEditedEvent,
    MatChipInputEvent,
    MatChipsModule,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';

import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatDividerModule,
        MatChipsModule,
        RouterLink,
    ],
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
    private userId: string | null = '';

    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    productForm: FormGroup;
    flavors: Array<string> = [];
    aditionals: Array<string> = [];

    constructor(
        private snackBar: MatSnackBar,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.productForm = new FormGroup({
            title: new FormControl(),
            weight: new FormControl(),
            measurementUnit: new FormControl(),
            img: new FormControl(),
            maxAditionals: new FormControl(0),
            maxFlavors: new FormControl(),
            price: new FormControl(),
            flavors: new FormControl(),
            aditionals: new FormControl(),
        });
    }
    async ngOnInit(): Promise<void> {
        this.userId = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.userId) {
            const product = await firstValueFrom(
                this.productService.getSingle(this.userId)
            );
            this.productForm.patchValue({
                title: product.title,
                weight: product.weight,
                measurementUnit: product.measurementUnit,
                img: product.img,
                maxAditionals: product.maxAditionals,
                maxFlavors: product.maxFlavors,
                price: product.price,
                flavors: product.flavors,
                aditionals: product.aditionals,
            });
            this.aditionals = [...product.aditionals];
            this.flavors = [...product.flavors];
        }
    }

    async submitForm() {
        if (!this.productForm.valid || this.flavors.length <= 0) {
            this.snackBar.open('Preencha todos os campos!', 'Fechar', {
                panelClass: 'error-msg',
                duration: 3000,
            });
            return;
        }

        const product = {
            ...this.productForm.value,
            flavors: this.flavors,
            aditionals: this.aditionals,
        };

        try {
            if (this.userId) {
                console.log(this.userId);
                await firstValueFrom(
                    this.productService.edit({ ...product, id: this.userId })
                );

                this.snackBar.open('Produto editado com sucesso!', 'Fechar', {
                    panelClass: 'success-msg',
                    duration: 3000,
                });
            } else {
                await firstValueFrom(this.productService.create(product));

                this.snackBar.open('Produto criado com sucesso!', 'Fechar', {
                    panelClass: 'success-msg',
                    duration: 3000,
                });
            }
        } catch (error) {
            console.log(error);
            this.snackBar.open(
                'Ocorreu um erro ao enviar o produto!',
                'Fechar',
                {
                    panelClass: 'error-msg',
                    duration: 3000,
                }
            );
        }

        this.clearForm();
        if (this.userId) {
            this.router.navigate(['/add-product'])
        }
    }

    clearForm() {
        this.productForm.reset();
        this.flavors = [];
        this.aditionals = [];
    }

    addFlavor(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.flavors.push(value);
        }

        event.chipInput!.clear();
    }

    removeFlavor(flavor: string): void {
        const index = this.flavors.indexOf(flavor);

        if (index >= 0) {
            this.flavors.splice(index, 1);
        }
    }

    editFlavor(flavor: string, event: MatChipEditedEvent) {
        const value = event.value.trim();

        if (!value) {
            this.removeFlavor(flavor);
            return;
        }

        const index = this.flavors.indexOf(flavor);
        if (index >= 0) {
            this.flavors[index] = value;
        }
    }
    addAditional(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.aditionals.push(value);
        }

        event.chipInput!.clear();
    }

    removeAditional(aditional: string): void {
        const index = this.aditionals.indexOf(aditional);

        if (index >= 0) {
            this.aditionals.splice(index, 1);
        }
    }

    editAditional(aditional: string, event: MatChipEditedEvent) {
        const value = event.value.trim();

        if (!value) {
            this.removeAditional(aditional);
            return;
        }

        const index = this.aditionals.indexOf(aditional);
        if (index >= 0) {
            this.aditionals[index] = value;
        }
    }
}
