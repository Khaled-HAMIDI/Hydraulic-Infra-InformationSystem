package dz.ade.pfe.commons.notification.services

import dz.ade.pfe.commons.notification.mapper.NewNotificationDto
import dz.ade.pfe.commons.notification.mapper.NumberOfNotificationDto
import dz.ade.pfe.commons.notification.mapper.ShowNotificationDto
import dz.ade.pfe.domain.admin.User

interface NotificationService {

    companion object {
        const val CREATED_NOTIFICATION_URL = "/topic/notifications/created"
        const val DELETED_NOTIFICATION_URL = "/topic/notifications/deleted"
        const val DELETE_NOTIFICATION_URL = "/notifications/delete"
        const val SEEN_NOTIFICATION_URL = "/notifications/seen"
    }

    fun getNotificationsByUser(username: String, limit: Int): NumberOfNotificationDto

    fun markNotificationAsSeen(notificationId: String): Boolean

    fun markNotificationAsDeleted(notificationId: String): Boolean

    fun createNewNotifications(newNotificationDto: NewNotificationDto,
                               users: List<User>): List<ShowNotificationDto>

    fun sendNewNotificationToUser(notificationsDto: ShowNotificationDto)

    fun sendDeletedNotificationToUser(notificationsId: String)

    fun sendSeenNotificationToUser(notificationsId: String)
}
