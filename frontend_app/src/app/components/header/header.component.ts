import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Top header/navigation component with brand and theme accents.
 * PUBLIC_INTERFACE
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {}
