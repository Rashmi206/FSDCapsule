import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
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
  parentTaskOptions: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private taskService: TaskService, public datepipe: DatePipe, public router: Router) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(tasks => this.parentTaskOptions = Object.assign([], tasks));
    this.taskService.getTask(this.route.snapshot.paramMap.get('id')).subscribe(task => {
      this.taskForm.setValue({
        task: task['task'],
        priority: task['priority'],
        parentTask: task['parentTask'],
        startDate: this.datepipe.transform(task['startDate'], 'yyyy-MM-dd'),
        endDate: this.datepipe.transform(task['endDate'], 'yyyy-MM-dd'),
      });
    })
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
  clearParent() {
    this.taskForm.controls["parentTask"].setValue("");
  }
  navigateToViewTask() {
    this.taskForm.reset();
    this.router.navigate(['/view-task']);
  }
  updateTask() {
    if (this.compareTwoDates()) {
      const task = {
        task: this.taskform.task.value,
        startDate: this.taskform.startDate.value,
        endDate: this.taskform.endDate.value,
        priority: this.taskform.priority.value,
        parentTask: this.taskform.parentTask.value ? this.taskform.parentTask.value : null
      }
      this.taskService.endTask(this.route.snapshot.paramMap.get('id'), task).subscribe(data => {
        alert("Task updated successfully");
        this.navigateToViewTask();
      })
    }
  }
}
