import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { IChat } from './interfaces/chat.interface';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  chats: IChat[] = [];
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
    this.WebSocketService.fromEvent<any>('chat update').subscribe( chat => {
      const finded = this.chats.findIndex(e => e.messages[0].key.remoteJid === chat.jid);
      console.log(chat)
      this.chats[finded].messages.push(chat.messages[0])
    })
  };
}
