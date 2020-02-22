import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject, Subject, EMPTY} from 'rxjs';
import {DOMAIN} from 'config/api.config';
import {AuthenticationService} from 'app/main/authentication/authentication.service';
import {StompService, StompConfig, StompState} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";

const WEBSOCKET_URL = "ws://" + DOMAIN + "/socket";
const NEW_NOTIFICATIONS_URL = "/topic/notifications/created";
const DELETED_NOTIFICATIONS_URL = "/topic/notifications/deleted";
const DELETE_NOTIFICATION_URL = "/notifications/delete";
const SEEN_NOTIFICATION_URL = "/notifications/seen";

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private newMessages: Observable<Message> = EMPTY;
    private deletedMessages: Observable<Message> = EMPTY;
    private markMessages: Observable<Message> = EMPTY;
    private stompService: StompService;

    constructor(private authenticationService: AuthenticationService) {
        this.initSocket();
    }

    initSocket(): void {
        if (this.stompService) {
            this.stompService.deactivate();
            this.stompService.disconnect();
        }

        if (!this.authenticationService.getToken()) {
            return;
        }

        let stompConfig: StompConfig = {
            url: WEBSOCKET_URL,

            headers: {
                token: this.authenticationService.getToken()
            },
            heartbeat_in: 0,
            heartbeat_out: 20000,
            reconnect_delay: 5000,
            debug: false
        };

        this.stompService = new StompService(stompConfig);
        this.newMessages = this.stompService.subscribe(NEW_NOTIFICATIONS_URL);
        this.deletedMessages = this.stompService.subscribe(DELETED_NOTIFICATIONS_URL);
        this.markMessages = this.stompService.subscribe(SEEN_NOTIFICATION_URL);
    }

    public streamNewNotifications(): Observable<Message> {
        return this.newMessages;
    }

    public streamDeletedNotifications(): Observable<Message> {
        return this.deletedMessages;
    }

    public streamMarkNotifications(): Observable<Message> {
        return this.markMessages;
    }

    public deleteNotification(message: any) {
        return this.stompService.publish(DELETE_NOTIFICATION_URL, JSON.stringify(message));
    }

    public markNotificationAsSeen(message: any) {
        return this.stompService.publish(SEEN_NOTIFICATION_URL, JSON.stringify(message));
    }

    public state(): BehaviorSubject<StompState> {
        return this.stompService.state;
    }
}
