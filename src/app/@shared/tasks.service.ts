import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppTask } from './task.interface';
import { formatDate, parseDate } from './utils';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private taskSubject: BehaviorSubject<AppTask[]> = new BehaviorSubject<AppTask[]>([]);
  private _tasks: { [k: string]: AppTask[] };
  private currentDate: Date = new Date;

  get tasks$(): Observable<AppTask[]> {return this.taskSubject.asObservable()}

  constructor() {
    this._tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
  }

  getTasks(date: Date = new Date) {
    this.currentDate = date;
    let dateStr = formatDate(this.currentDate);
    let tasks = this._tasks[dateStr];
    if (!tasks) {
      this._tasks[dateStr] = [];
      this.persistTasks();
    }
    this.taskSubject.next(tasks);
  }

  private persistTasks() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
    console.log("Saving")
  }

  addTask(task: AppTask) {
    let tasks: AppTask[] = this._tasks[formatDate(this.currentDate)];
    tasks.push(task);
    this.persistTasks();
    this.getTasks();
  }
}
