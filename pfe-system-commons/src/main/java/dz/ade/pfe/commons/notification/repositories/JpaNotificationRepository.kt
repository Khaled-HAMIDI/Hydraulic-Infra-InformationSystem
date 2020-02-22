package dz.ade.pfe.commons.notification.repositories

import dz.ade.pfe.domain.commons.Notification
import org.springframework.data.domain.Pageable
import java.util.*

interface JpaNotificationRepository {

    fun findByUserUsernameOrderByCreationDateDesc(username: String): List<Notification>

    fun findTopByUserUsernameOrderByCreationDateDesc(pageable: Pageable, username: String): List<Notification>

    fun markNotificationAsSeen(code: String, date: Date): Int

    fun markNotificationAsDeleted(code: String, date: Date): Int

    fun <S : Notification> saveAll(entities: Iterable<S>): List<S>

    fun getCountNotificationSeenIsFalse(username: String) : Int
}
