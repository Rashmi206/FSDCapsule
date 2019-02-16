import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  getAllTasks() {
    return this.http.get('http://localhost:3000/api/tasks');
  }
  addTask(task) {
    return this.http.post('http://localhost:3000/api/task', task, httpOptions);
  }
  endTask(tid, data) {
    return this.http.put('http://localhost:3000/api/task/' + tid, data, httpOptions);
  }
  getTask(tid) {
    return this.http.get('http://localhost:3000/api/task/' + tid);
  }
}
