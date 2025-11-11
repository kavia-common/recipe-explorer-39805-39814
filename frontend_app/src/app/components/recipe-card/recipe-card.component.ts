import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../core/models/recipe.model';

/**
 * Displays a single recipe summary in a card.
 * PUBLIC_INTERFACE
 */
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;
}
