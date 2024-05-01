import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './hero-home.component.html',
  styleUrl: './hero-home.component.scss'
})
export class HeroHomeComponent {

}
