import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo App';
  tasks: string[] = [];
  editIndex: number | null = null;

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required)
  });


  onSubmit(): void {
    if (this.todoForm.valid) {
      const taskTitle = this.todoForm.value.title;
      if (!taskTitle) return; // stop if null/empty
      const idx = this.editIndex;
      if (idx != null) {
        this.tasks[idx] = taskTitle;
        this.editIndex = null;
      } else {
        this.tasks.push(taskTitle);
      }
      this.todoForm.reset();
    }
  }

  deleteTask(index: number): void {
   this.tasks.splice(index, 1);
  }

  editTask(index: number): void {
    const value = this.tasks[index];
    this.todoForm.patchValue({ title: value });
    this.editIndex = index;
  }
}
