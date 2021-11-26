import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { IChat } from './interfaces/chat.interface';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  chats: any[] = [];
  selectedChat: IChat | null = null;
  constructor(private WebSocketService: WebSocketService) {}

  ngOnInit(): void {
    const contacts = [
      { cellphone: '5491124222118', name: 'Judith Larrosa' },
      { cellphone: '5491160170903', name: 'Maty Prime' },
      { cellphone: '5491138716631', name: 'Jefita♥' },
    ];
    this.WebSocketService.GetChats(contacts).subscribe({
      next: (res) => {
        this.chats = res;
      },
    });
  }
}
