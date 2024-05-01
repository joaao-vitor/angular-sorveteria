import { ProductCartService } from './../../services/product-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../interfaces/product.interface';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProductCart } from '../../interfaces/productCart.interface';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
    constructor(public dialog: MatDialog) {}

    @Input({ required: true }) product!: Product;

    openDialog() {
        const dialogRef = this.dialog.open(ProductDialog);
        const instance = dialogRef.componentInstance;
        instance.product = this.product;
    }
}

@Component({
    selector: 'product-dialog',
    templateUrl: 'product-dialog.component.html',
    styleUrl: 'product-dialog.component.scss',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatAccordion,
        MatExpansionModule,
    ],
})
export class ProductDialog implements OnInit {
    public flavors: FormGroup = this.formBuilder.group({});
    public aditionals: FormGroup = this.formBuilder.group({});

    @Input() product!: Product;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<ProductDialog>,
        private productCartService: ProductCartService
    ) {}

    ngOnInit() {
        this.flavors = this.formBuilder.group(this.flavorsConstruct());
        this.aditionals = this.formBuilder.group(this.aditionalsConstruct());
    }

    private flavorsConstruct() {
        if (!this.product || !this.product.flavors) {
            return {};
        }

        const flavorsArr = this.product.flavors;
        const flavorsObj: { [key: string]: boolean } = {};
        flavorsArr.forEach((f) => {
            flavorsObj[f] = false;
        });
        return flavorsObj;
    }

    private aditionalsConstruct() {
        if (!this.product || !this.product.aditionals) {
            return {};
        }

        const aditionalsArr = this.product.aditionals;
        const aditionalsObj: { [key: string]: boolean } = {};
        aditionalsArr.forEach((f) => {
            aditionalsObj[f] = false;
        });
        return aditionalsObj;
    }

    handleFlavorClick(event: Event, flavor: string) {
        const checkbox = event.target as HTMLInputElement;
        const checkedCount = Object.values(this.flavors.value).filter(
            (isChecked) => isChecked
        ).length;

        if (checkedCount > this.product.maxFlavors && checkbox.checked) {
            checkbox.checked = false;
            this.flavors.patchValue({ [flavor]: false });
            this.snackBar.open(
                `Escolha no máximo ${this.product.maxFlavors} sabores`,
                '',
                {
                    duration: 2000,
                    panelClass: ['error-msg'],
                }
            );
        }
    }

    handleAditionalClick(event: Event, aditional: string) {
        const checkbox = event.target as HTMLInputElement;
        const checkedCount = Object.values(this.aditionals.value).filter(
            (isChecked) => isChecked
        ).length;

        if (checkedCount > this.product.maxAditionals && checkbox.checked) {
            checkbox.checked = false;
            this.aditionals.patchValue({ [aditional]: false });
            this.snackBar.open(
                `Escolha no máximo ${this.product.maxAditionals} adicionais`,
                '',
                {
                    duration: 2000,
                    panelClass: ['error-msg'],
                }
            );
        }
    }

    handleAddCart() {
        const pickedFlavors = Object.entries(this.flavors.value)
            .filter((arr) => arr[1] === true)
            .map((f) => f[0]);

        const pickedAditionals = Object.entries(this.aditionals.value)
            .filter((arr) => arr[1] === true)
            .map((a) => a[0]);

        if (!pickedFlavors.length) {
            this.snackBar.open('Selecione pelo menos 1 sabor', '', {
                duration: 2000,
                panelClass: 'error-msg',
            });
            return;
        }

        const productCart: ProductCart = {
            product: this.product,
            pickedFlavors,
            pickedAditionals,
        };

        this.productCartService.add(productCart);

        this.dialogRef.close();
    }
}
