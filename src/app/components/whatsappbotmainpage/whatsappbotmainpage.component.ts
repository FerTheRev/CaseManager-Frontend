import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITaskDTO } from '../../interfaces/task.interface';
import { WebSocketService } from '../../services/web-socket.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { CreatecasesComponent } from '../createcases/createcases.component';
import { AuthService } from '../login/services/auth.service';

interface AssignmentMeta { AssignmentFileName: string, CGCasesFileName: string, CGPhonesFileName: string, importedAt: string };

interface AssignmentLocalStorage {
  AssignmentMetadata: AssignmentMeta;
  Cases: any[];
}

@Component({
  selector: 'app-whatsappbotmainpage',
  templateUrl: './whatsappbotmainpage.component.html',
  styleUrls: ['./whatsappbotmainpage.component.scss']
})
export class WhatsappbotmainpageComponent implements OnInit {
  Cases: any[] = [];
  WspState: string = 'close';
  tasks: ITaskDTO[] = [];
  UserName: string = '';
  AssignmentMetadata: AssignmentMeta = {
    AssignmentFileName: '',
    CGCasesFileName: '',
    CGPhonesFileName: '',
    importedAt: ''
  }
  constructor(
    private matDialog: MatDialog,
    private webSocketService: WebSocketService,
    private loginService: AuthService,
    private router: Router
  ) {
    const Asignacion: AssignmentLocalStorage = JSON.parse(localStorage.getItem('Asignacion')!);
    if (Asignacion) {
      this.AssignmentMetadata = Asignacion.AssignmentMetadata;
      this.Cases = Asignacion.Cases;
    };
  };

  ngOnInit(): void {
    this.webSocketService.fromEvent<any[]>('tasks').subscribe(tasks => {
      this.tasks = tasks;
    });
    this.webSocketService.fromEvent<ITaskDTO>('new task created').subscribe(task => this.tasks.push(task));
    this.loginService.GetUserProfile().subscribe((r: any) => this.UserName = r.fullName);
    this.webSocketService.fromEvent('get chats').subscribe(c => console.log('chats', c));
    this.webSocketService.GetWspConnStatus().subscribe(r => {
      if (r === 'open') {
        this.webSocketService.emit('get selected chats', ['5491124222118', '5491160170903', '5491138716631']);
      };
    })

  };

  openCreateCases() {
    const dialogRef = this.matDialog.open(CreatecasesComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(r => {
      if (!r) return;
      console.log(r);
      this.Cases = r.Assignment.Cases;
      this.AssignmentMetadata = {
        AssignmentFileName: r.AssignmentFileName,
        CGCasesFileName: r.CGCasesFileName,
        CGPhonesFileName: r.CGPhonesFileName,
        importedAt: new Date().toLocaleDateString()
      };
      localStorage.setItem(
        'Asignacion',
        JSON.stringify({ AssignmentMetadata: this.AssignmentMetadata, Cases: this.Cases }));
    });
  };

  openCreateTask() {
    const dialogRef = this.matDialog.open(CreateTaskComponent, {
      width: 'auto',
      panelClass: ['overflow-auto', 'm-2'],
    });

    dialogRef.afterClosed().subscribe(task => {
      if (!task) return;

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


  logOut() {
    localStorage.removeItem('cc');
    this.router.navigate(['login']);
  };

};
