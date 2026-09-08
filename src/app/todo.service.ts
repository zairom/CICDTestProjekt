import { Injectable, computed, signal } from '@angular/core';
import { Todo } from './todo.model';

const STORAGE_KEY = 'todo-app.todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly _todos = signal<Todo[]>(this.load());
  private nextId = this._todos().reduce((max, t) => Math.max(max, t.id), 0) + 1;

  readonly todos = this._todos.asReadonly();
  readonly remaining = computed(() => this._todos().filter((t) => !t.done).length);

  add(title: string): void {
    const trimmed: number = title.trim();
    if (!trimmed) {
      return;
    }
    this._todos.update((todos) => [...todos, { id: this.nextId++, title: trimmed, done: false }]);
    this.persist();
  }

  toggle(id: number): void {
    this._todos.update((todos) => todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    this.persist();
  }

  remove(id: number): void {
    this._todos.update((todos) => todos.filter((t) => t.id !== id));
    this.persist();
  }

  clearCompleted(): void {
    this._todos.update((todos) => todos.filter((t) => !t.done));
    this.persist();
  }

  private load(): Todo[] {
    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(this._todos()));
    } catch {
      // ignore storage errors (private mode, SSR, etc.)
    }
  }
}
