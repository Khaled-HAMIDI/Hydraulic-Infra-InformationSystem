package dz.ade.pfe.commons.notification.repositories

import dz.ade.pfe.domain.commons.Notification
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import java.util.*

internal interface JpaNotificationRepositoryImpl :
        JpaNotificationRepository, JpaRepository<Notification, Long> {

    override fun findByUserUsernameOrderByCreationDateDesc(username: String): List<Notification>

    @Query("SELECT n FROM Notification n WHERE n.user.username = :username ORDER BY n.creationDate DESC")
    override fun findTopByUserUsernameOrderByCreationDateDesc(pageable: Pageable, username: String): List<Notification>

    @Query("UPDATE Notification n SET n.seen = true, n.seenDate = :date WHERE n.code = :code")
    @Modifying
    @Transactional
    override fun markNotificationAsSeen(
            @Param("code") code: String,
            @Param("date") date: Date
    ): Int

    @Query("UPDATE Notification n SET n.gone = true, n.goneDate = :date WHERE n.code = :code")
    @Modifying
    @Transactional
    override fun markNotificationAsDeleted(
            @Param("code") code: String,
            @Param("date") date: Date
    ): Int

    @Query("SELECT count(n) FROM Notification n WHERE n.user.username = :username and n.seen = false and n.gone = false")
    override fun getCountNotificationSeenIsFalse(username: String): Int
}
