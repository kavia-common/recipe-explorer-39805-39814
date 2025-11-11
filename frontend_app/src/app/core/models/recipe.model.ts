export interface Ingredient {
  name: string;
  amount?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  timeMinutes: number;
  ingredients: Ingredient[];
  instructions: string[];
  tags?: string[];
}
