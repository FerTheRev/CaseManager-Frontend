import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { WebSocketService } from '../../services/web-socket.service';
@Component({
  selector: 'app-connect-wsp',
  templateUrl: './connect-wsp.component.html',
  styleUrls: ['./connect-wsp.component.scss']
})
export class ConnectWspComponent implements OnInit {
  wspQrCode!: string;
  WspConnectionState: string = 'close';

  @Output() wspConnectionSate = new EventEmitter<string>();
  constructor(
    private WsService: WebSocketService) { }

  ngOnInit(): void {
    this.WsService.GetWspConnStatus().subscribe((e: any) => {
      this.WspConnectionState = e;
      this.wspConnectionSate.emit(e);
      this.wspQrCode = '';
      this.WsService.WspState = e;
    });
  };

  ConnectWsp() {
    this.WsService.GetQR().subscribe((e) => {
      this.wspQrCode = e as string;
    });
  };
}