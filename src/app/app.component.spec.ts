import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  // beforeEach(() => TestBed.configureTestingModule({
  //   imports: [RouterTestingModule],
  //   declarations: [AppComponent]
  // }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule,RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Todo App');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('Todo App');
  // });

  it('should add a new task on submit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.todoForm.setValue({ title: "First Todo"});
    app.onSubmit();

    expect(app.tasks.length).toBe(1);
    expect(app.tasks[0]).toBe('First Todo');
  });

  it('should edit an existing task', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.tasks = ['Old Task'];

    app.editTask(0);
    expect(app.editIndex).toBe(0);
    expect(app.todoForm.value.title).toBe('Old Task');

    app.todoForm.setValue({ title: 'Updated Task' });
    app.onSubmit();

    expect(app.tasks[0]).toBe('Updated Task');
    expect(app.editIndex).toBeNull();
  });

  it('should delete a task', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.tasks = ['task 1', 'task 2'];
    app.deleteTask(0);

    expect(app.tasks.length).toBe(1);
    expect(app.tasks[0]).toBe('task 2');
  });

  it('should update DOM when task is added', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    app.todoForm.setValue({ title: 'DOM Task' });
    app.onSubmit();
    fixture.detectChanges();

    console.log(compiled.innerHTML);

    const liElements = compiled.querySelectorAll('li');
    expect(liElements.length).toBe(1);
    expect(liElements[0].textContent).toContain('DOM Task');
  });

  it('should delete a task when delete button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.tasks = ['Task 1'];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const deleteBtn = compiled.querySelector('button.delete-btn') as HTMLButtonElement;

    deleteBtn.click();
    fixture.detectChanges();

    expect(app.tasks.length).toBe(0);
  });

  it('should not add a task when form is invalid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.todoForm.setValue({ title: '' });
    app.onSubmit();

    expect(app.tasks.length).toBe(0);
  });
});
