export class Notification {
    numberOfNotifications: number;
    notifications : ListNotification[];
   
    constructor(notification?) {
        notification = notification || {};
        this.notifications = notification.notifications || [];
        this.numberOfNotifications  = notification.numberOfNotifications || '';
    }
}

export class ListNotification{
    id: string;
    code: string;
    message: string;
    user : string;
    seen: boolean; 
    actionValue: string;
    notificationAction: string;
}