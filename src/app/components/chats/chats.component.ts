import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  EventEmitter,
} from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { UserChatHistory } from '../../interfaces/ChatHistoty.inteface';
import { IChat } from '../messenger/interfaces/chat.interface';

export type Contact = {
  id: string;
  name: string;
};
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, AfterViewInit {
  @ViewChildren('chat') private tabsList!: QueryList<ElementRef>;
  @Output() selectedChat = new EventEmitter<any>();
  chats: any[] = [];
  contacts: Contact[] = [];
  constructor(private WebSockets: WebSocketService) {}

  ngOnInit(): void {
    this.WebSockets.fromEvent<Contact[]>('[GET] Contacts').subscribe(
      (contacts) => {
        this.contacts = contacts;
        // console.log('Contacts: ',contacts);
      }
    );
    this.WebSockets.fromEvent<any[]>('[GET] Chats').subscribe((chats) => {
      this.chats = chats;
      this.chats.sort((a: any, b: any) =>  b.conversationTimestamp.low - a.conversationTimestamp.low );
      // console.log('Chats: ',chats);
      
    });
    this.MessagesOnChages();
    this.ChatsOnChages();
  }

  ngAfterViewInit() {
    this.tabsList.forEach((tab) => {
      tab.nativeElement.addEventListener('click', (el: any) => {
        this.tabsList.forEach((e) =>
          e.nativeElement.classList.remove('active')
        );
        el.target.classList.add('active');
      });
    });
  }

  getChatContact(id: string) {
    const contactName = this.contacts.find((e) => e.id === id);
    return contactName;
  }

  loadMessages(chat: any) {
    const chatWHeader = {
      ...this.getChatContact(chat.id),
      ...chat,
    };
    this.selectedChat.emit(chatWHeader);
  }

  MessagesOnChages() {
    this.WebSockets.fromEvent<any>('get message update').subscribe((res) => {
      console.log(res);
      // if (res.from === 'MESSAGES-UPSERT') {
      //  try {
      //   const isFor = this.chats.findIndex(c => c.id === res.data.messages[0].key.remoteJid);
      //   res.data.messages.forEach((message: any) => {
      //     if(isFor === -1) return;
      //     this.chats[isFor].messages.push(message)
      //   });
      //  } catch (error) {
      //    console.log(res);
      //  }
        
      //   // if (this.chats[isFor].messages.lenght > 100) {
      //   //   this.chats[isFor].messages = this.chats[isFor].messages.slice(-100)
      //   // }
      // }
    });
  };

  ChatsOnChages() {
    this.WebSockets.fromEvent<any>('get chats changes').subscribe(chatChanges => {
      // if(chatChanges.data[0].id === 'status@broadcast') return
      console.log(chatChanges);
      // const chatToUpdate = this.chats.findIndex(c => c.id === chatChanges.data[0].id);
      // if (chatToUpdate !== -1) {
      //   const Timestamp = this.chats[chatToUpdate].conversationTimestamp.low;
      //   const NewTimestamp = chatChanges.data[0].conversationTimestamp;
      //   if (Timestamp < NewTimestamp) {
      //     this.chats[chatToUpdate].conversationTimestamp.low = chatChanges.data[0].conversationTimestamp;
      //     this.chats.sort((a: any, b: any) =>  b.conversationTimestamp.low - a.conversationTimestamp.low );
      //   }
      // }
    })
  }
}
