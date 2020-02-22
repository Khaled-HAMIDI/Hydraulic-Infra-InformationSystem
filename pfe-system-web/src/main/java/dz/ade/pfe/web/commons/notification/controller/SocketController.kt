package dz.ade.pfe.web.commons.notification.controller

import dz.ade.pfe.commons.notification.services.NotificationService
import dz.ade.pfe.commons.notification.services.NotificationService.Companion.CREATED_NOTIFICATION_URL
import dz.ade.pfe.commons.notification.services.NotificationService.Companion.DELETED_NOTIFICATION_URL
import dz.ade.pfe.commons.notification.services.NotificationService.Companion.DELETE_NOTIFICATION_URL
import dz.ade.pfe.commons.notification.services.NotificationService.Companion.SEEN_NOTIFICATION_URL
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.stereotype.Controller
import serilogj.Log

@Controller
class SocketController(
        private val notificationService: NotificationService
) {
    @MessageMapping(DELETE_NOTIFICATION_URL)
    fun markNotificationAsDeleted(notificationId: String) {
        Log.information("Mark notifications with id = $notificationId as deleted")
        val markNotificationAsDeleted = notificationService.markNotificationAsDeleted(notificationId)
        Log.information("Mark notifications with id = $notificationId as deleted $markNotificationAsDeleted")
    }

    @MessageMapping(SEEN_NOTIFICATION_URL)
    fun markNotificationAsSeen(notificationId: String) {
        Log.information("Mark notifications with id = $notificationId as seen")
        notificationService.markNotificationAsSeen("100")
    }

    @SubscribeMapping(CREATED_NOTIFICATION_URL)
    fun onSubscribeNewNotification(): String {
        return "subscribed to new notifications"
    }

    @SubscribeMapping(DELETED_NOTIFICATION_URL)
    fun onSubscribeDeletedNotification(): String {
        return "subscribed to deleted notifications"
    }

    @SubscribeMapping(SEEN_NOTIFICATION_URL)
    fun onSubscribeSeenNotification(): String {
        return "subscribed to seen notifications"
    }
}
