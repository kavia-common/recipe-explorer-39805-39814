import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { getApiBase } from '../env';

/**
 * Service responsible for retrieving recipes from an API or from an in-memory fallback.
 * PUBLIC_INTERFACE
 */
@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  private recipes$ = new BehaviorSubject<Recipe[] | null>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string | null>(null);

  /** PUBLIC_INTERFACE */
  getRecipes(): Observable<Recipe[]> {
    /**
     * Returns recipe list and caches in memory. Tries remote API first if configured,
     * otherwise falls back to mock data.
     */
    if (this.recipes$.value) return this.recipes$.asObservable() as Observable<Recipe[]>;

    this.loading$.next(true);
    const apiBase = getApiBase();

    if (apiBase) {
      this.http.get<Recipe[]>(`${apiBase.replace(/\/$/, '')}/recipes`)
        .pipe(
          tap(() => this.error$.next(null)),
          catchError((err: HttpErrorResponse) => {
            this.error$.next(err.message || 'Failed to load recipes, using local data.');
            return of(this.mockRecipes()).pipe(delay(200));
          }),
          tap(() => this.loading$.next(false)),
        )
        .subscribe((data) => this.recipes$.next(this.normalize(data)));
    } else {
      // No API configured; use fallback mock
      of(this.mockRecipes()).pipe(delay(200)).subscribe((data) => {
        this.recipes$.next(this.normalize(data));
        this.loading$.next(false);
        this.error$.next(null);
      });
    }

    return this.recipes$.asObservable() as Observable<Recipe[]>;
  }

  /** PUBLIC_INTERFACE */
  getRecipeById(id: string): Observable<Recipe | undefined> {
    /** Retrieve a recipe by id from cache or API/fallback. */
    const existing = this.recipes$.value;
    if (existing) return of(existing.find(r => r.id === id));

    // If not yet loaded, trigger load and then map
    return this.getRecipes().pipe(map(list => list.find(r => r.id === id)));
  }

  /** PUBLIC_INTERFACE */
  search(term: string): Observable<Recipe[]> {
    /** Filter recipes by title or ingredient, real-time. */
    const lower = term.trim().toLowerCase();
    return this.getRecipes().pipe(
      map(recipes =>
        !lower ? recipes :
        recipes.filter(r =>
          r.title.toLowerCase().includes(lower) ||
          r.ingredients.some(i => i.name.toLowerCase().includes(lower))
        )
      )
    );
  }

  /** PUBLIC_INTERFACE */
  loading(): Observable<boolean> { return this.loading$.asObservable(); }

  /** PUBLIC_INTERFACE */
  lastError(): Observable<string | null> { return this.error$.asObservable(); }

  private normalize(data: Recipe[]): Recipe[] {
    return data.map(r => ({
      ...r,
      image: r.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop'
    }));
  }

  private mockRecipes(): Recipe[] {
    return [
      {
        id: '1',
        title: 'Lemon Herb Grilled Salmon',
        description: 'Fresh salmon with zesty lemon and fragrant herbs.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop',
        timeMinutes: 25,
        ingredients: [
          { name: 'Salmon fillets', amount: '2' },
          { name: 'Lemon', amount: '1' },
          { name: 'Olive oil', amount: '2 tbsp' },
          { name: 'Fresh dill' },
          { name: 'Salt & pepper' }
        ],
        instructions: [
          'Preheat grill to medium-high.',
          'Brush salmon with olive oil and season.',
          'Grill 4–5 minutes per side.',
          'Finish with lemon juice and fresh dill.'
        ],
        tags: ['seafood', 'healthy']
      },
      {
        id: '2',
        title: 'Creamy Mushroom Pasta',
        description: 'Silky pasta in a rich mushroom cream sauce.',
        image: 'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?w=1200&q=80&auto=format&fit=crop',
        timeMinutes: 30,
        ingredients: [
          { name: 'Pasta', amount: '300 g' },
          { name: 'Mushrooms', amount: '250 g' },
          { name: 'Garlic', amount: '2 cloves' },
          { name: 'Cream', amount: '200 ml' },
          { name: 'Parmesan', amount: '50 g' }
        ],
        instructions: [
          'Cook pasta al dente.',
          'Sauté mushrooms and garlic.',
          'Add cream and simmer.',
          'Toss pasta with sauce and parmesan.'
        ],
        tags: ['vegetarian']
      },
      {
        id: '3',
        title: 'Citrus Quinoa Salad',
        description: 'Light and refreshing salad with quinoa and citrus.',
        image: 'https://images.unsplash.com/photo-1503831901032-74b3f9ab7b52?w=1200&q=80&auto=format&fit=crop',
        timeMinutes: 20,
        ingredients: [
          { name: 'Quinoa', amount: '1 cup' },
          { name: 'Orange', amount: '1' },
          { name: 'Cucumber', amount: '1/2' },
          { name: 'Mint leaves' },
          { name: 'Olive oil' }
        ],
        instructions: [
          'Cook quinoa and cool.',
          'Chop citrus and vegetables.',
          'Toss with olive oil and mint.'
        ],
        tags: ['gluten-free', 'salad']
      }
    ];
  }
}
