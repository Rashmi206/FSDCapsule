import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm = this.fb.group(
    {
      task: ['', Validators.required],
      priority: [0],
      parentTask: [''],
      startDate: [''],
      endDate: ['']
    }
  );
  error: any = { isError: false, errorMessage: '' };
  parentTask: any;

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnInit() {
    this.setDates();
    this.taskService.getAllTasks().subscribe(parents => this.parentTask = Object.assign([], parents))
  }

  get taskform() { return this.taskForm.controls; }

  compareTwoDates() {
    if (new Date(this.taskForm.controls['endDate'].value) < new Date(this.taskForm.controls['startDate'].value)) {
      this.error = { isError: true, errorMessage: "End Date can't before start date" };
      this.taskForm.setErrors({ 'invalid': true });
      return false;
    }
    else {
      this.error = { isError: false };
      this.taskForm.setErrors(null);
      return true;
    }
  }

  resetFields() {
    this.taskForm.reset();
    this.taskForm.controls["priority"].setValue(0);
    this.setDates();
    this.taskService.getAllTasks().subscribe(parents => this.parentTask = Object.assign([], parents))
  }

  setDates() {
    var m = new Date();
    var dateString =
      m.getUTCFullYear() + "-" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
      ("0" + m.getUTCDate()).slice(-2);
    this.taskForm.controls["startDate"].setValue(dateString);
    m = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000);
    var dateString =
      m.getUTCFullYear() + "-" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
      ("0" + m.getUTCDate()).slice(-2);
    this.taskForm.controls["endDate"].setValue(dateString);
  }

  addTask() {
    if (this.compareTwoDates()) {
      const task = {
        task: this.taskform.task.value,
        startDate: this.taskform.startDate.value,
        endDate: this.taskform.endDate.value,
        priority: this.taskform.priority.value,
        parentTask: this.taskform.parentTask.value ? this.taskform.parentTask.value : null
      }
      this.taskService.addTask(task).subscribe(data => {
        alert("Task added successfully");
        this.resetFields();
      })
    }
  }
}
