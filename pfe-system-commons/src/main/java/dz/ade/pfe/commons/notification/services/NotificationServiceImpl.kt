package dz.ade.pfe.commons.notification.services

import com.fasterxml.jackson.databind.ObjectMapper
import dz.ade.pfe.commons.notification.mapper.*
import dz.ade.pfe.commons.notification.repositories.JpaNotificationRepository
import dz.ade.pfe.domain.admin.User
import dz.ade.pfe.domain.commons.Notification
import org.springframework.data.domain.PageRequest
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service
import java.util.*

@Service
class NotificationServiceImpl(
        private val notificationRepository: JpaNotificationRepository,
        private val notificationDtoNotificationMapper: NotificationDtoNotificationMapper,
        private val template: SimpMessagingTemplate
) : NotificationService {

    /*@Cacheable(cacheNames = ["top-notifications"],
            key = "'notifications-user-'.concat(#username).concat('-limit-').concat(#limit)",
            unless = "#result.size() == 0")*/
    override fun getNotificationsByUser(username: String, limit: Int): NumberOfNotificationDto {
        val notifications = if (limit == -1) notificationRepository.findByUserUsernameOrderByCreationDateDesc(username)
        else notificationRepository
                .findTopByUserUsernameOrderByCreationDateDesc(PageRequest.of(0, limit), username)

        val notificationsDto = notificationDtoNotificationMapper.convertNotificationToListNotificationDto(notifications)
        val countNotification = notificationRepository.getCountNotificationSeenIsFalse(username)

        return NumberOfNotificationDto(countNotification, notificationsDto)
    }

    /*@CacheEvict(cacheNames = ["top-notifications"], allEntries = true)*/
    override fun markNotificationAsSeen(notificationId: String): Boolean {
        val seen = notificationRepository.markNotificationAsSeen(notificationId, Date()) > 0
        sendSeenNotificationToUser(notificationId)
        return seen
    }

    //@CacheEvict(cacheNames = ["top-notifications"], allEntries = true)
    override fun markNotificationAsDeleted(notificationId: String): Boolean {
        val deleted = notificationRepository.markNotificationAsDeleted(notificationId, Date()) > 0
        sendDeletedNotificationToUser(notificationId)
        return deleted
    }

    //@CacheEvict(cacheNames = ["top-notifications"], allEntries = true)
    override fun createNewNotifications(newNotificationDto: NewNotificationDto, users: List<dz.ade.pfe.domain.admin.User>)
            : List<ShowNotificationDto> {
        if (users.isEmpty()) return emptyList()

        val notification = notificationDtoNotificationMapper
                .convertNewNotificationDtoNotification(newNotificationDto)
        notification.code = UUID.randomUUID().toString()

        val notifications: MutableList<dz.ade.pfe.domain.commons.Notification> = mutableListOf()
        users.forEachIndexed { index, user ->
            val newNotification = if (index == 0) {
                notification.user = user
                notification
            } else cloneNotification(notification, user)

            notifications.add(newNotification)
        }

        val savedNotifications = notificationRepository.saveAll(notifications)

        val notificationsDto = notificationDtoNotificationMapper.convertNotificationToShowNotificationDto(savedNotifications)

        notificationsDto.forEach {
            sendNewNotificationToUser(it)
        }

        return notificationsDto
    }

    override fun sendNewNotificationToUser(notificationsDto: ShowNotificationDto) {
        val value = ObjectMapper().writeValueAsString(notificationsDto)
        template.convertAndSend(NotificationService.CREATED_NOTIFICATION_URL, value)
    }

    override fun sendSeenNotificationToUser(notificationsId: String) {
        template.convertAndSend(NotificationService.SEEN_NOTIFICATION_URL, notificationsId)
    }

    override fun sendDeletedNotificationToUser(notificationsId: String) {
        template.convertAndSend(NotificationService.DELETED_NOTIFICATION_URL, notificationsId)
    }

    fun cloneNotification(notification: Notification, user: User) =
            Notification(
                    null,
                    notification.code,
                    notification.message,
                    notification.seen,
                    notification.seenDate,
                    notification.gone,
                    notification.goneDate,
                    notification.notificationLevel,
                    notification.notificationAction,
                    notification.actionValue,
                    user
            )
}
