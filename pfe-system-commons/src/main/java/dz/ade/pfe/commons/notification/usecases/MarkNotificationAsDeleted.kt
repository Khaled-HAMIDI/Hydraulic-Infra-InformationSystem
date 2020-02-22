package dz.ade.pfe.commons.notification.usecases

import dz.ade.pfe.commons.UseCase
import dz.ade.pfe.commons.notification.services.NotificationService
import lombok.Value
import org.springframework.stereotype.Component

@Component
class MarkNotificationAsDeleted(
        private val notificationService: NotificationService
) : UseCase<MarkNotificationAsDeleted.InputValues, MarkNotificationAsDeleted.OutputValues>() {

    override fun execute(input: InputValues): OutputValues {
        return OutputValues(notificationService
                .markNotificationAsDeleted(input.code))
    }

    @Value
    class InputValues(
            val code: String
    ) : UseCase.InputValues

    @Value
    class OutputValues(
            val showNotificationDtos: Boolean
    ) : UseCase.OutputValues
}