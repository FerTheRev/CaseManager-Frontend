export interface ChatHistory {
    chats:    UserChatHistory[];
    contacts: any[];
}

export interface UserChatHistory {
    id:                         string;
    unreadCount:                number;
    readOnly:                   boolean;
    ephemeralExpiration:        number;
    conversationTimestamp:      Timestamp;
    notSpam:                    boolean;
    endOfHistoryTransferType?:  number;
    ephemeralSettingTimestamp?: Timestamp;
    name?:                      string;
    pHash?:                     string;
    messages:                   MessageElement[]
}

export interface Chat {
    id:                         string;
    unreadCount:                number;
    readOnly:                   boolean;
    ephemeralExpiration:        number;
    conversationTimestamp:      Timestamp;
    notSpam:                    boolean;
    endOfHistoryTransferType?:  number;
    ephemeralSettingTimestamp?: Timestamp;
    name?:                      string;
    pHash?:                     string;
    messages:                   MessageElement[];
}

export interface Timestamp {
    low:      number;
    high:     number;
    unsigned: boolean;
}

export interface MessageElement {
    key:                    MessageKey;
    message?:               MessageMessage;
    messageTimestamp:       string;
    status?:                Status;
    ephemeralOutOfSync?:    boolean;
    mediaData?:             MediaData;
    messageC2STimestamp?:   string;
    participant?:           string;
    messageStubType?:       string;
    messageStubParameters?: string[];
}

export interface MessageKey {
    remoteJid: string;
    fromMe:    boolean;
    id:        string;
}

export interface MediaData {
    localPath: string;
}

export interface MessageMessage {
    conversation?:        string;
    audioMessage?:        Message;
    stickerMessage?:      StickerMessage;
    imageMessage?:        ImageMessage;
    protocolMessage?:     ProtocolMessage;
    extendedTextMessage?: ExtendedTextMessage;
    templateMessage?:     TemplateMessage;
}

export interface Message {
    url:               string;
    mimetype:          Mimetype;
    fileSha256:        string;
    fileLength:        string;
    seconds?:          number;
    ptt?:              boolean;
    mediaKey:          string;
    fileEncSha256:     string;
    directPath:        string;
    mediaKeyTimestamp: string;
    isAnimated?:       boolean;
}

export enum Mimetype {
    AudioOggCodecsOpus = "audio/ogg; codecs=opus",
    ImageWebp = "image/webp",
}

export interface ExtendedTextMessage {
    text:        string;
    previewType: string;
    contextInfo: ExtendedTextMessageContextInfo;
}

export interface ExtendedTextMessageContextInfo {
    stanzaId:      string;
    participant:   string;
    quotedMessage: PurpleQuotedMessage;
}

export interface PurpleQuotedMessage {
    conversation?:   string;
    stickerMessage?: Message;
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
    scansSidecar?:         string;
    scanLengths?:          number[];
    midQualityFileSha256?: string;
    contextInfo?:          ImageMessageContextInfo;
}

export interface ImageMessageContextInfo {
    forwardingScore: number;
    isForwarded:     boolean;
}

export interface ProtocolMessage {
    key:                 ProtocolMessageKey;
    type:                string;
    ephemeralExpiration: number;
}

export interface ProtocolMessageKey {
    remoteJid: string;
    fromMe:    boolean;
}

export interface StickerMessage {
    url:                string;
    fileSha256:         string;
    fileEncSha256:      string;
    mediaKey:           string;
    mimetype:           Mimetype;
    height?:            number;
    width?:             number;
    directPath:         string;
    fileLength:         string;
    mediaKeyTimestamp:  string;
    isAnimated:         boolean;
    contextInfo?:       StickerMessageContextInfo;
    firstFrameLength?:  number;
    firstFrameSidecar?: string;
}

export interface StickerMessageContextInfo {
    stanzaId:      string;
    participant:   string;
    quotedMessage: FluffyQuotedMessage;
}

export interface FluffyQuotedMessage {
    stickerMessage: Message;
}

export interface TemplateMessage {
    hydratedFourRowTemplate: HydratedTemplate;
    hydratedTemplate:        HydratedTemplate;
}

export interface HydratedTemplate {
    hydratedContentText: string;
}

export enum Status {
    DeliveryACK = "DELIVERY_ACK",
    Played = "PLAYED",
    Read = "READ",
}
