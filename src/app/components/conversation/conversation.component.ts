import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IChat, MessageElement } from '../messenger/interfaces/chat.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { WebSocketService } from '../../services/web-socket.service';
import { UserChatHistory } from '../../interfaces/ChatHistoty.inteface';
import { Contact } from '../chats/chats.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, AfterViewChecked {
  constructor(
    private DomSanitizer: DomSanitizer,
    private webSocketService: WebSocketService
  ) {}
  @ViewChild('textMessage') textMessage!: ElementRef<HTMLDivElement>;
  @ViewChild('messagesWindow') messagesWindow!: ElementRef<HTMLDivElement>;
  // @ViewChild() messagesWindow!: ElementRef<HTMLDivElement>;
  @Input() selectedChatConversation: any | undefined = undefined;

  ngOnInit(): void {
    console.log(this.selectedChatConversation);
    
  }
  ngAfterViewChecked() {
    this.updateScroll();
  }

  sentMessage(jid: string) {
    const text = this.textMessage.nativeElement.textContent;
    if (text!.length > 0) {
      this.webSocketService.emit('send message', { jid, text });
      this.textMessage.nativeElement.textContent = '';
    }
  }

  private updateScroll() {
    if (this.messagesWindow) {
      this.messagesWindow.nativeElement.scrollTop =
        this.messagesWindow.nativeElement.scrollHeight;
    }
  }
}
