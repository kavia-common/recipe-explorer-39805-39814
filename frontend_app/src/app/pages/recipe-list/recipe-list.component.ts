import { Component, OnInit, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RecipeService } from '../../core/services/recipe.service';
import { Recipe } from '../../core/models/recipe.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

/**
 * Page that displays a searchable grid of recipe cards.
 * PUBLIC_INTERFACE
 */
@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, SearchBarComponent, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);

  query = signal('');
  recipes$ = this.recipeService.getRecipes();
  filtered$ = this.recipeService.search(this.query());

  loading$ = this.recipeService.loading();
  error$ = this.recipeService.lastError();

  ngOnInit(): void {
    // initialize filtered stream to reflect query updates
    this.filtered$ = this.recipeService.search(this.query());
  }

  onSearch(q: string) {
    this.query.set(q);
    this.filtered$ = this.recipeService.search(q);
  }
}
