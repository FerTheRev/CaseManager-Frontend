import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IChat } from '../components/messenger/interfaces/chat.interface';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {
  tasks: any[] = [];
  WspState: string = '';
  constructor() {
    super({ url: `${environment.server_uri}`, options: { query: { token: localStorage.getItem('cc') } } });
  };

  GetQR() {
    this.emit('connectWsp');
    return this.fromEvent('wsp qr code')
  };

  GetWspConnStatus() {
    return this.fromEvent<string>('wspConnectionState');
  };

  GetChats(contacts: any[]): Observable<IChat[]> {
    this.emit('get selected chats', contacts);
    return this.fromEvent<IChat[]>('get chats');
  }
}
