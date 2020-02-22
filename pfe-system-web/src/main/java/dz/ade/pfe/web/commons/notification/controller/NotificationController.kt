package dz.ade.pfe.web.commons.notification.controller

import dz.ade.pfe.commons.UseCaseExecutor
import dz.ade.pfe.commons.notification.mapper.NewNotificationDto
import dz.ade.pfe.commons.notification.mapper.NumberOfNotificationDto
import dz.ade.pfe.commons.notification.mapper.ShowNotificationDto
import dz.ade.pfe.commons.notification.usecases.*
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.web.bind.annotation.*
import java.util.concurrent.CompletableFuture

@RestController
@RequestMapping("/api")
@Api(value = "Notifications", description = "Operations on notifications")
class NotificationController(
        private val getNotificationByUserName: GetNotificationByUserName,
        private val createNotificationForUser: CreateNotificationForUser,
        private val createNotificationForRole: CreateNotificationForRole,
        private val markNotificationAsDeleted: MarkNotificationAsDeleted,
        private val markNotificationAsSeen: MarkNotificationAsSeen,
        private val useCaseExecutor: UseCaseExecutor
) {

    @GetMapping(value = ["/users/{username}/notifications"])
    @ApiOperation(value = "Show list of notifications by username")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Successfully retrieved a list of available notification"),
        ApiResponse(code = 401, message = "You are not authorized to get the list of notification"),
        ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden")
    ])
    fun getNotificationsByUsername(
            @PathVariable username: String,
            @RequestParam(defaultValue = "-1") limit: Int
    ): CompletableFuture<NumberOfNotificationDto> {
        return useCaseExecutor.execute(
                getNotificationByUserName,
                GetNotificationByUserName.InputValues(username, limit),
                { outputValues -> outputValues.numberOfNotificationDto })
    }

    @PostMapping(value = ["/users/{username}/notifications"])
    @ApiOperation(value = "Create new notification")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Successfully create notification"),
        ApiResponse(code = 401, message = "You are not authorized to create notifications"),
        ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden")
    ])
    fun createNotificationForUser(
            @RequestBody newNotificationDto: NewNotificationDto,
            @PathVariable username: String
    ): CompletableFuture<List<ShowNotificationDto>> {
        return useCaseExecutor.execute(
                createNotificationForUser,
                CreateNotificationForUser.InputValues(username, newNotificationDto),
                { outputValues -> outputValues.showNotificationDtos })
    }

    @PostMapping(value = ["/roles/{role}/notifications"])
    @ApiOperation(value = "Create new notification")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Successfully create notification"),
        ApiResponse(code = 401, message = "You are not authorized to create notifications"),
        ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden")
    ])
    fun createNotificationForRole(
            @RequestBody newNotificationDto: NewNotificationDto,
            @PathVariable role: String
    ): CompletableFuture<List<ShowNotificationDto>> {
        return useCaseExecutor.execute(
                createNotificationForRole,
                CreateNotificationForRole.InputValues(role, newNotificationDto),
                { outputValues -> outputValues.showNotificationDtos })
    }

    @PutMapping(value = ["/notifications/{notificationId}"])
    @ApiOperation(value = "Create new notification")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Successfully create notification"),
        ApiResponse(code = 401, message = "You are not authorized to create notifications"),
        ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden")
    ])
    fun markNotificationAsSeen(
            @PathVariable notificationId: String) : CompletableFuture<Boolean> {

        return useCaseExecutor.execute(
                markNotificationAsSeen,
                MarkNotificationAsSeen.InputValues(notificationId),
                { outputValues -> outputValues.showNotificationDtos})
    }

    @DeleteMapping(value = ["/notifications/{notificationId}"])
    @ApiOperation(value = "Create new notification")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Successfully create notification"),
        ApiResponse(code = 401, message = "You are not authorized to create notifications"),
        ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden")
    ])
    fun markNotificationAsDeleted(
            @PathVariable notificationId: String) : CompletableFuture<Boolean> {
        return useCaseExecutor.execute(
                markNotificationAsDeleted,
                MarkNotificationAsDeleted.InputValues(notificationId),
                { outputValues -> outputValues.showNotificationDtos})
    }
}
