package dz.ade.pfe.commons.notification.usecases

import dz.ade.pfe.admin.security.user.UserComponent
import dz.ade.pfe.commons.UseCase
import dz.ade.pfe.commons.notification.mapper.NewNotificationDto
import dz.ade.pfe.commons.notification.mapper.ShowNotificationDto
import dz.ade.pfe.commons.notification.services.NotificationService
import lombok.Value
import org.springframework.stereotype.Component

@Component
class CreateNotificationForOrganisationalStructureByRole(
        private val notificationService: NotificationService,
        private val userComponent: UserComponent
        )
    :UseCase<CreateNotificationForOrganisationalStructureByRole.InputValues,CreateNotificationForOrganisationalStructureByRole.OutputValues>()

{
    override fun execute(input: InputValues): OutputValues {

        val users=userComponent.getUsersByOrganisationalStructureCodeAndRole(input.organisationalStructureCode,input.role)


        return OutputValues(notificationService
                .createNewNotifications(input.newNotificationDto, users))
    }

    @Value
    class InputValues(
            val role: String,
            val organisationalStructureCode: String,
            val newNotificationDto: NewNotificationDto
    ) : UseCase.InputValues

    @Value
    class OutputValues(
            val showNotificationDtos: List<ShowNotificationDto>
    ) : UseCase.OutputValues

}