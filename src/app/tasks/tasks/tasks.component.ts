import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppTask } from 'src/app/@shared/task.interface';
import { TasksService } from 'src/app/@shared/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: [`
    td {
      text-align: center;
    }

    td:last-child {
      text-align: left;
    }
  `]
})
export class TasksComponent implements OnInit {

  constructor(private taskService: TasksService, private fb: FormBuilder) { }

  addingTask: boolean = false;
  editingTask: boolean = false;

  tasks$ = this.taskService.tasks$;

  form = this.fb.group({
    priority: 0,
    done: false,
    task: "",
    estimated: 0
  })

  ngOnInit() {
    // this.taskService.addTask({date: new Date, done: false, priority: 1, task: "Say hello"})
    this.taskService.getTasks();
  }

  addTask() {
    let newTask = <AppTask>{...this.form.value};
    this.taskService.addTask(newTask);
    this.form.reset();
    this.addingTask = false;
  }

}
