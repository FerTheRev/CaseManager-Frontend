import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IChat, MessageElement } from '../messenger/interfaces/chat.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { WebSocketService } from '../../services/web-socket.service';

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
  @Input() chat: IChat | null = null;
  ngOnInit(): void {
    console.log(this.chat);
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

  decodedAudioMessge(message: MessageElement) {
    const blob = new Blob([message.audioBuffer], { type: 'audio/ogg' });
    const url = window.URL.createObjectURL(blob);
    return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }

  private updateScroll() {
    if (this.messagesWindow) {
      this.messagesWindow.nativeElement.scrollTop =
        this.messagesWindow.nativeElement.scrollHeight;
    }
  }
}
