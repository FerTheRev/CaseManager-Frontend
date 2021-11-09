import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITaskDTO } from '../..//interfaces/task.interface';
import { WebSocketService } from '../../services/web-socket.service';
import { SeeDetailsComponent } from '../see-details/see-details.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task!: ITaskDTO;
  constructor(
    private webSocketService: WebSocketService,
    private MatDialog: MatDialog) { }

  ngOnInit(): void {
    this.webSocketService.fromEvent<{ id: string, taskProgress: number, state: string, details: any }>('current task progress')
      .subscribe(currentTask => {
        if (this.task.id === currentTask.id) {
          this.task.progress = currentTask.taskProgress;
          this.task.state = currentTask.state;
          this.task.details = currentTask.details
        };
      });
  }

  SeeDetails() {
    this.MatDialog.open(SeeDetailsComponent, {
      data: this.task.details.DontHaveCellphone,
      panelClass: ['overflow-auto']
    })
  };

  deleteTask(id: string) {
    this.webSocketService.emit('delete Task', id);
  }
}
