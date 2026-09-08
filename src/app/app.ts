import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly todoService = inject(TodoService);

  protected readonly todos = this.todoService.todos;
  protected readonly remaining = this.todoService.remaining;
  protected readonly draft = signal('');

  protected addTodo(): void {
    this.todoService.add(this.draft());
    this.draft.set('');
  }

  protected toggle(id: number): void {
    this.todoService.toggle(id);
  }

  protected remove(id: number): void {
    this.todoService.remove(id);
  }

  protected clearCompleted(): void {
    this.todoService.clearCompleted();
  }
}
