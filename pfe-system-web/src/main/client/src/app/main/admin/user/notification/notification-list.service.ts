import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {API} from 'config/api.config';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Notification} from 'app/main/model/notifications.model';
import {AuthenticationService} from 'app/main/authentication/authentication.service';
import {Message} from "@stomp/stompjs";
import {ToolsService} from "../../../../../@ayams/services/tools.service";
import {SocketService} from "./socket.service";
import { StompState } from '@stomp/ng2-stompjs';

const NOTIFICATIONS_API = API;

@Injectable({
    providedIn: 'root'
})
export class NotificationListService implements Resolve<any> {

    notifications: Notification[];

    constructor(private router: Router,
                private http: HttpClient,
                private fuseProgressBarService: FuseProgressBarService,
                private translate: TranslateService,
                private authenticationService: AuthenticationService,
                private toolsService: ToolsService,
                private socketService: SocketService) {
        this.socketService.initSocket();
    }

    getNotificationsByUsername(username: string, limit: number): Promise<any> {
        let notificationUrl = NOTIFICATIONS_API + '/users/' + username + '/notifications';
        if (limit > 0) notificationUrl += '?limit=' + limit;
        return new Promise((resolve, reject) => {
            this.http.get(notificationUrl)
                .subscribe((response: Notification[]) => {
                    this.notifications = response;
                    resolve(response);
                }, reject);
        });
    }

    delete(id: String): Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            this.http.request('delete', NOTIFICATIONS_API + '/notifications/' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    update(id: String): Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            this.http.put(NOTIFICATIONS_API + '/notifications/' + id, '')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    deleteNotifications(notification): void {
        this.fuseProgressBarService.show();

        this.delete(notification.id).then(
            (response) => {
                this.fuseProgressBarService.hide();
                this.toolsService.showSuccess('LIST.TOAST.success-delete');
            },
            (error) => {
                console.log(error);
                this.fuseProgressBarService.hide();
                this.toolsService.showError('LIST.TOAST.error-delete');
            }
        );
    }

    updateNotifications(notification): void {
        this.update(notification.id).then(
            (response) => {
                notification.seen = true;
            }
        );
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getNotificationsByUsername(this.authenticationService.getUsername(), -1)
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    this.router.navigate(['**']);
                    resolve();
                }
            );
        });
    }

    public streamNewNotifications(): Observable<Message> {
        return this.socketService.streamNewNotifications();
    }

    public streamDeletedNotifications(): Observable<Message> {
        return this.socketService.streamDeletedNotifications();
    }

    public streamMarkNotifications(): Observable<Message> {
        return this.socketService.streamMarkNotifications();
    }

    public state(): BehaviorSubject<StompState> {
        return this.socketService.state();
    }
}
