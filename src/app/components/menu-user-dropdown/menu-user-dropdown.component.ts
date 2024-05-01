import { Component, EventEmitter, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu-user-dropdown',
    standalone: true,
    imports: [MatMenuModule, MatIconModule, RouterLink],
    templateUrl: './menu-user-dropdown.component.html',
    styleUrl: './menu-user-dropdown.component.scss',
})
export class MenuUserDropdownComponent {
    @Output() closeEvent = new EventEmitter();
    closeMenu() {
        this.closeEvent.emit();
    }
}
