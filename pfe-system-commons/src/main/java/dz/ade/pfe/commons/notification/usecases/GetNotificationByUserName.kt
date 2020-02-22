package dz.ade.pfe.commons.notification.usecases

import dz.ade.pfe.commons.UseCase
import dz.ade.pfe.commons.notification.mapper.ListNotificationDto
import dz.ade.pfe.commons.notification.mapper.NumberOfNotificationDto
import dz.ade.pfe.commons.notification.services.NotificationService
import lombok.Value
import org.springframework.stereotype.Component

@Component
class GetNotificationByUserName(
        private val notificationService: NotificationService
) : UseCase<GetNotificationByUserName.InputValues, GetNotificationByUserName.OutputValues>() {

    override fun execute(input: InputValues): OutputValues {
        return OutputValues(notificationService
                .getNotificationsByUser(input.username, input.limit))
    }

    @Value
    class InputValues(
            val username: String,
            val limit: Int = 0
    ) : UseCase.InputValues

    @Value
    class OutputValues(
            val numberOfNotificationDto: NumberOfNotificationDto
    ) : UseCase.OutputValues
}
