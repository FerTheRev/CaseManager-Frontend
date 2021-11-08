import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: any;
  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.fromEvent<{ id: string, taskProgress: number, state: string }>('current task progress')
      .subscribe(currentTask => {
        // const taskIndex = this.tasks.findIndex(e => e.id === currentTask.id);
        // if (taskIndex != -1) {
        //   this.tasks[taskIndex].progress = currentTask.taskProgress;
        //   this.tasks[taskIndex].state = currentTask.state;
        //   this.webSocketService.tasks = this.tasks;
        // };
        if (this.task.id === currentTask.id) {
          this.task.progress = currentTask.taskProgress;
          this.task.state = currentTask.state;
        };
      });
  }

}
