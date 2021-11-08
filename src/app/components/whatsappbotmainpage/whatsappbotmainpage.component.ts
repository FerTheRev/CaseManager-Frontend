import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WebSocketService } from '../../services/web-socket.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { CreatecasesComponent } from '../createcases/createcases.component';

@Component({
  selector: 'app-whatsappbotmainpage',
  templateUrl: './whatsappbotmainpage.component.html',
  styleUrls: ['./whatsappbotmainpage.component.scss']
})
export class WhatsappbotmainpageComponent implements OnInit {
  Cases: [] = [];
  WspState: string = 'close';
  tasks: any[] = [];
  AssignmentFileName: string = 'Sin asignacion cargada';
  constructor(
    private matDialog: MatDialog,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.webSocketService.fromEvent<any[]>('tasks').subscribe(tasks => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
    this.webSocketService.fromEvent('new task created').subscribe(task => this.tasks.push(task));
    
  };

  openCreateCases() {
   const dialogRef =  this.matDialog.open(CreatecasesComponent, {
     disableClose: true
   });

   dialogRef.afterClosed().subscribe(r => {
     if(!r) return;
     console.log(r);
     this.Cases = r.Assignment.Cases;
     this.AssignmentFileName = r.name
   });
  };

  openCreateTask() {
    const dialogRef = this.matDialog.open(CreateTaskComponent, {
      width: 'auto',
      panelClass: ['overflow-auto', 'm-2'],
    });

    dialogRef.afterClosed().subscribe(task => {
      if(!task) return;

      const newtask = {
        ...task, 
        taskType: 'Enviar Mensajes de Whatsapp',
        CasesToSendWsp: this.Cases,
        state: 'Incompleto',
        progress: 0,
      };
      this.webSocketService.emit('create new task', newtask)
    })
  };

  whatsappStateChanges(state: string) {
    this.WspState = state;
  }

}
