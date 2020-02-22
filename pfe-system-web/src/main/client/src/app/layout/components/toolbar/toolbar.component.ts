import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseConfigService} from '@fuse/services/config.service';
import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from 'app/main/authentication/login.service';
import {ProfileService} from 'app/main/profile/profile.service';

import {NotificationListService} from 'app/main/admin/user/notification/notification-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListNotification} from 'app/main/model/notifications.model';
import {AuthenticationService} from 'app/main/authentication/authentication.service';
import {Message} from '@stomp/stompjs';

import {navigation} from 'app/navigation/navigation';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {locale as arabic} from './i18n/ar';
import {locale as french} from './i18n/fr';
import find from 'lodash/find';
import remove from 'lodash/remove';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    notifications: ListNotification[];
    numberOfNotifications: number;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {LoginService} loginService
     * @param {ProfileService} profileService
     * @param {NotificationListService} notificationListService
     * @param {FuseTranslationLoaderService} fuseTranslationLoader
     * @param {ActivatedRoute} route
     * @param {AuthenticationService} authenticationService
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private loginService: LoginService,
        public profileService: ProfileService,
        public notificationListService: NotificationListService,
        private fuseTranslationLoader: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        public router: Router
    ) {
        this.notifications = [];
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'fr',
                title: 'Français',
                flag: 'fr'
            },
            {
                id: 'ar',
                title: 'عربي',
                flag: 'ar'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        //Get notifications
        this.notificationListService.getNotificationsByUsername(this.authenticationService.getUsername(), -1)
            .then((notification) => {
                    this.notifications = notification.notifications;
                    this.numberOfNotifications = notification.numberOfNotifications;
                },
                (error: Error) => {
                });

        this.notificationListService.streamNewNotifications().pipe(takeUntil(this._unsubscribeAll)).subscribe((message: Message) => {
            if (message.body == "subscribed to new notifications") return;

            let notification: ListNotification = JSON.parse(message.body);
            if (notification.user != this.authenticationService.getUsername()) return;

            this.notifications.unshift(JSON.parse(message.body));
            this.numberOfNotifications++;
        });

        this.notificationListService.streamDeletedNotifications().pipe(takeUntil(this._unsubscribeAll)).subscribe((message: Message) => {
            if (message.body == "subscribed to deleted notifications") return;

            let deletedId = message.body;
            remove(this.notifications, (n) => {
                if (!n.seen) {
                    console.log('streamDeletedNotifications:1:' + n);
                    this.numberOfNotifications--;
                }
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

        this.selectedLanguage = find(this.languages, {id: this._translateService.currentLang});
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        if (key != 'quickPanel') this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logout() {
        this.loginService.logout();
    }

    markNotificationAsSeen(notification): void {
        if (!notification.seen) {
            this.notificationListService.updateNotifications(notification);
        }

        if (notification.notificationAction == "ROUTE")
            this.router.navigate([notification.actionValue]);
    }
}
