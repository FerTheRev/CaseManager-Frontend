import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  EventEmitter
} from '@angular/core';
import { IChat } from '../messenger/interfaces/chat.interface';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, AfterViewInit {
  @ViewChildren('chat') private tabsList!: QueryList<ElementRef>;
  @Input('chats') chats: IChat [] = [];
  @Output() selectedChat: EventEmitter<IChat> = new EventEmitter<IChat>();
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tabsList.forEach((tab) => {
      tab.nativeElement.addEventListener('click', (el: any) => {
        this.tabsList.forEach((e) => e.nativeElement.classList.remove('active'));
        el.target.classList.add('active');
      });
    });
  };
  loadMessages(chat: IChat) {
    this.selectedChat.emit(chat);
  };
}
