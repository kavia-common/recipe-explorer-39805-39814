import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RecipeService } from '../../core/services/recipe.service';
import { switchMap } from 'rxjs/operators';

/**
 * Detail page that shows a single recipe's info, ingredients, and instructions.
 * PUBLIC_INTERFACE
 */
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, AsyncPipe],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(RecipeService);

  recipe$ = this.route.paramMap.pipe(
    switchMap(params => this.service.getRecipeById(params.get('id') || ''))
  );
}
