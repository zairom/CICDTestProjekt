import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    try {
      globalThis.localStorage?.removeItem?.('todo-app.todos');
    } catch {
      // no usable storage in this environment
    }
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Todo');
  });

  it('shows the empty state initially', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.todo__empty')).not.toBeNull();
  });

  it('adds a todo through the form', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('.todo__input') as HTMLInputElement;
    input.value = 'write tests';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    (compiled.querySelector('.todo__form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    const items = compiled.querySelectorAll('.todo__item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('write tests');
  });
});
