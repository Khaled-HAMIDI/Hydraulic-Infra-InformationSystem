import {Component, OnInit, OnDestroy} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NotificationListService} from './notification-list.service';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {ListNotification} from 'app/main/model/notifications.model';
import {Message} from "@stomp/stompjs";
import {StompState} from "@stomp/ng2-stompjs";
import {locale as french} from './i18n/fr';
import {locale as arabic} from './i18n/ar';
import {AuthenticationService} from 'app/main/authentication/authentication.service';
import find from 'lodash/find';
import remove from 'lodash/remove';
import {ToolsService} from '@ayams/services/tools.service';

@Component({
    selector: 'notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    animations: fuseAnimations
})
export class NotificationListComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    notifications: ListNotification[];
    numberOfNotifications: number;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    state: string = "NOT CONNECTED";

    constructor(private route: ActivatedRoute,
                private notificationListService: NotificationListService,
                private authenticationService: AuthenticationService,
                public matDialog: MatDialog,
                private toolsService: ToolsService,
                public router: Router) {
        this.toolsService.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Init function
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {

        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.notifications = response.data[0].notifications;
                this.numberOfNotifications = response.data[0].numberOfNotifications;
            },
            (error) => {
                console.log(error);
            }
        );

        this.notificationListService.streamNewNotifications().pipe(takeUntil(this._unsubscribeAll)).subscribe((message: Message) => {
            if (message.body == "subscribed to new notifications") return;

            let notification: ListNotification = JSON.parse(message.body);
            if (notification.user != this.authenticationService.getUsername()) return;

            this.notifications.unshift(JSON.parse(message.body));
        });

        this.notificationListService.streamDeletedNotifications().pipe(takeUntil(this._unsubscribeAll)).subscribe((message: Message) => {
            if (message.body == "subscribed to deleted notifications") return;

            let deletedId = message.body;
            remove(this.notifications, (n) => {
                if (!n.seen) this.numberOfNotifications--;
                return n.id == deletedId;
            });
        });

        this.notificationListService.streamMarkNotifications().pipe(takeUntil(this._unsubscribeAll)).subscribe((message: Message) => {
            if (message.body == "subscribed to seen notifications") return;

            let seenId = message.body;
            let notification = find(this.notifications, (notification) => {
                return notification.id == seenId
            });

            if (notification) {
                notification.seen = true;
                this.numberOfNotifications--;
            }
        });

        this.notificationListService.state().pipe(takeUntil(this._unsubscribeAll)).subscribe((state: StompState) => {
            this.state = StompState[state];
        });

    }

    deleteNotification(notification): void {
        this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);
        this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
            if (result) {
                this.notificationListService.deleteNotifications(notification);
            }
            this.confirmDialogRef = null;
        });
    }

    markNotificationAsSeen(notification): void {
        if (!notification.seen) {
            this.notificationListService.updateNotifications(notification);
        }

        if (notification.notificationAction == "ROUTE")
            this.router.navigate([notification.actionValue]);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}