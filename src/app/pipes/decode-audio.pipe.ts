import { Pipe, PipeTransform } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'decodeAudio',
})
export class DecodeAudioPipe implements PipeTransform {
  constructor(
    private webSocketService: WebSocketService,
    private Http: HttpClient,
    private DomSanitizer: DomSanitizer
  ) {}

   transform(message: any) {
    //  console.log(message);
    const blob = new Blob([message.audioBuffer], { type: 'audio/ogg' });
    const url = window.URL.createObjectURL(blob);
    return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }
}
