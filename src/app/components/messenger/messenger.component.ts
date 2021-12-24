import { Component, OnInit } from '@angular/core';
import {
  UserChatHistory,
  ChatHistory,
} from '../../interfaces/ChatHistoty.inteface';
import { Contact } from '../chats/chats.component';
import { ConversationComponent } from '../conversation/conversation.component';
import { IChat } from './interfaces/chat.interface';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  chats: UserChatHistory[] = [];
  selectedChatConversation: any | undefined = undefined;
  constructor() {}

  ngOnInit(): void {
  }
}
