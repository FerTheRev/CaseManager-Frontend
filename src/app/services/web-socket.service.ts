import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';


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
  }
}
