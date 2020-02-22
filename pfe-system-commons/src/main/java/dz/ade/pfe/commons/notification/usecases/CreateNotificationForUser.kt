package dz.ade.pfe.commons.notification.usecases

import dz.ade.pfe.admin.security.user.UserComponent
import dz.ade.pfe.commons.UseCase
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException
import dz.ade.pfe.commons.notification.mapper.NewNotificationDto
import dz.ade.pfe.commons.notification.mapper.ShowNotificationDto
import dz.ade.pfe.commons.notification.services.NotificationService
import lombok.Value
import org.springframework.stereotype.Component

@Component
class CreateNotificationForUser(
        private val notificationService: NotificationService,
        private val userComponent: UserComponent
) : UseCase<CreateNotificationForUser.InputValues, CreateNotificationForUser.OutputValues>() {

    override fun execute(input: InputValues): OutputValues {
        val user = userComponent
                .findByUsername(input.username)
                .orElseThrow { ResourceNotFoundException("user with username = ${input.username} not found") }

        return OutputValues(notificationService
                .createNewNotifications(input.newNotificationDto, listOf(user)))
    }

    @Value
    class InputValues(
            val username: String,
            val newNotificationDto: NewNotificationDto
    ) : UseCase.InputValues

    @Value
    class OutputValues(
            val showNotificationDtos: List<ShowNotificationDto>
    ) : UseCase.OutputValues
}