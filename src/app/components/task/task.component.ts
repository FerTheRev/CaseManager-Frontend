import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
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
    this.webSocketService.fromEvent<{ taskID: string, taskProgress: number }>('[TASKS] Progress')
      .subscribe(({taskID, taskProgress}) => {
        this.updateTask(taskID, 'progress', taskProgress)
      });

    this.webSocketService.fromEvent<{ taskID: string, state: string}>('[TASKS] State').subscribe( ({taskID, state}) => {
      this.updateTask(taskID, 'state', state)
    });

    this.webSocketService.fromEvent<{taskID: string, details: any}>('[TASKS] Details').subscribe(({taskID, details}) => {
      this.updateTask(taskID, 'details', details)
    })
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

  private updateTask(taskID: string, property: string, data: any){
    const propToUpdate: any = {
      'progress': () => this.task.progress = data,
      'state': () => this.task.state = data,
      'details': () => this.task.details = data
    };

    if(this.task.id !== taskID) return;
    propToUpdate[property]();
  }
}
