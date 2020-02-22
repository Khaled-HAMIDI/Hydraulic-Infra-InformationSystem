package dz.ade.pfe.commons.notification.usecases


import dz.ade.pfe.admin.security.user.UserComponent
import dz.ade.pfe.commons.UseCase
import dz.ade.pfe.commons.notification.mapper.NewNotificationDto
import dz.ade.pfe.commons.notification.mapper.ShowNotificationDto
import dz.ade.pfe.commons.notification.services.NotificationService
import dz.ade.pfe.domain.admin.User
import lombok.Value
import org.springframework.stereotype.Component

@Component
class CreateNotificationForOrganisationalStructuresAndRole(
        private val notificationService: NotificationService,
        private val userComponent: UserComponent
)
    :UseCase<CreateNotificationForOrganisationalStructuresAndRole.InputValues,CreateNotificationForOrganisationalStructuresAndRole.OutputValues>()

{
    override fun execute(input: InputValues): OutputValues {
        var users= ArrayList<User>()
        input.organisationalStructureCodes.forEach{
            var user=userComponent.getUsersByOrganisationalStructureCodeAndRole(it,input.role)
            users.addAll(user)
        }

        return OutputValues(notificationService
                .createNewNotifications(input.newNotificationDto, users))
    }

    @Value
    class InputValues(
            val role: String,
            val organisationalStructureCodes: List<String>,
            val newNotificationDto: NewNotificationDto
    ) : UseCase.InputValues

    @Value
    class OutputValues(
            val showNotificationDtos: List<ShowNotificationDto>
    ) : UseCase.OutputValues

}


