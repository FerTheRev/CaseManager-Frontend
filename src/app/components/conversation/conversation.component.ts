import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IChat, MessageElement } from '../messenger/interfaces/chat.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  constructor(
    private DomSanitizer: DomSanitizer
  ) {}
  @ViewChild('textMessage') textMessage!: ElementRef<HTMLDivElement>; 
  @Input() chat: IChat | null = null;
  ngOnInit(): void {
    console.log(this.chat);
  }
  sentMessage() {
    const text = this.textMessage.nativeElement.textContent;
    if(text!.length > 0) {
      console.log(text);
      this.textMessage.nativeElement.textContent = '';
    }
  };

  decodedAudioMessge(message: MessageElement) {
    const blob = new Blob([message.audioBuffer], { type: 'audio/ogg'});
    const url = window.URL.createObjectURL(blob);
    return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }
}
