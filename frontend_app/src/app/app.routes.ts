import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';

/**
 * App Routes
 * - '/' shows the recipe list.
 * - '/recipe/:id' shows the recipe detail page.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: '**', redirectTo: '' }
];
