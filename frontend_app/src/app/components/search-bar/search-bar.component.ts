import { Component, EventEmitter, Output, input, signal } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * Search bar component for filtering recipes.
 * PUBLIC_INTERFACE
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  placeholder = input<string>('Search recipes or ingredients…');
  query = signal('');

  @Output() search = new EventEmitter<string>();

  onInput(value: string) {
    this.query.set(value ?? '');
    this.search.emit(value ?? '');
  }

  clear() {
    this.query.set('');
    this.search.emit('');
  }
}
