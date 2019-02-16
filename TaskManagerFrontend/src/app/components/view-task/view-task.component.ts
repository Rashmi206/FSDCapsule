import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, public router: Router) { }
  tasks: any;
  ngOnInit() {
    this.getTasks();
  }
  editTask(tid) {
    this.router.navigate(['/edit-task', tid]);
  }
  endTask(tid) {
    const data = {
      "finished": true
    }
    this.taskService.endTask(tid, data).subscribe(tasks => this.getTasks());
  }
  getTasks() {
    this.taskService.getAllTasks().subscribe(parents => this.tasks = Object.assign([], parents))
  }
}
