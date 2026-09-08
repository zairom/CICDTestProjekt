import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    try {
      globalThis.localStorage?.removeItem?.('todo-app.todos');
    } catch {
      // no usable storage in this environment
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('starts empty', () => {
    expect(service.todos()).toEqual([]);
    expect(service.remaining()).toBe(0);
  });

  it('adds a trimmed todo', () => {
    service.add('  buy milk  ');
    expect(service.todos()).toEqual([{ id: 1, title: 'buy milk', done: false }]);
    expect(service.remaining()).toBe(1);
  });

  it('ignores empty input', () => {
    service.add('   ');
    expect(service.todos()).toEqual([]);
  });

  it('toggles done state and updates remaining', () => {
    service.add('task');
    const id = service.todos()[0].id;
    service.toggle(id);
    expect(service.todos()[0].done).toBe(true);
    expect(service.remaining()).toBe(0);
  });

  it('removes a todo', () => {
    service.add('a');
    service.add('b');
    service.remove(service.todos()[0].id);
    expect(service.todos().map((t) => t.title)).toEqual(['b']);
  });

  it('clears completed todos', () => {
    service.add('a');
    service.add('b');
    service.toggle(service.todos()[0].id);
    service.clearCompleted();
    expect(service.todos().map((t) => t.title)).toEqual(['b']);
  });
});
