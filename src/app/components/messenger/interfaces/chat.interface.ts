export interface IChat {
  profilePicture: string;
  name:           string;
  messages:       MessageElement[];
  cursor:         Cursor;
}

export interface Cursor {
  id:     string;
  fromMe: boolean;
}

export interface MessageElement {
  key:                    Key;
  message?:               MessageMessage;
  messageTimestamp:       string;
  status?:                Status;
  ephemeralOutOfSync?:    boolean;
  mediaData?:             MediaData;
  messageC2STimestamp?:   string;
  messageStubType?:       string;
  messageStubParameters?: string[];
  audioBuffer: any;
}

export interface Key {
  remoteJid: RemoteJid;
  fromMe:    boolean;
  id:        string;
}

export enum RemoteJid {
  The5491124222118SWhatsappNet = "5491124222118@s.whatsapp.net",
  The5491138716631SWhatsappNet = "5491138716631@s.whatsapp.net",
  The5491160170903SWhatsappNet = "5491160170903@s.whatsapp.net",
}

export interface MediaData {
  localPath: string;
}

export interface MessageMessage {
  audioMessage?:        AudioMessage;
  conversation?:        string;
  imageMessage?:        ImageMessage;
  extendedTextMessage?: ExtendedTextMessage;
}

export interface AudioMessage {
  url:               string;
  mimetype:          Mimetype;
  fileSha256:        string;
  fileLength:        string;
  seconds:           number;
  ptt:               boolean;
  mediaKey:          string;
  fileEncSha256:     string;
  directPath:        string;
  mediaKeyTimestamp: string;
}

export enum Mimetype {
  AudioOggCodecsOpus = "audio/ogg; codecs=opus",
}

export interface ExtendedTextMessage {
  text:        string;
  previewType: string;
  contextInfo: ContextInfo;
}

export interface ContextInfo {
  stanzaId:      string;
  participant:   string;
  quotedMessage: QuotedMessage;
}

export interface QuotedMessage {
  conversation?: string;
  imageMessage?: ImageMessage;
}

export interface ImageMessage {
  url:                   string;
  mimetype:              string;
  fileSha256:            string;
  fileLength:            string;
  height:                number;
  width:                 number;
  mediaKey:              string;
  fileEncSha256:         string;
  directPath:            string;
  mediaKeyTimestamp:     string;
  jpegThumbnail:         string;
  scansSidecar?:         string;
  scanLengths?:          number[];
  midQualityFileSha256?: string;
}

export enum Status {
  DeliveryACK = "DELIVERY_ACK",
  Played = "PLAYED",
  Read = "READ",
}
