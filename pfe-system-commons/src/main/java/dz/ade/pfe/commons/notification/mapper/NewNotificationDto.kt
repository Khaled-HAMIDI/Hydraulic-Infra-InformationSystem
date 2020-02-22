package dz.ade.pfe.commons.notification.mapper

import dz.ade.pfe.domain.commons.NotificationAction
import dz.ade.pfe.domain.commons.NotificationLevel

data class NewNotificationDto(
        var message: String,
        var notificationLevel: NotificationLevel,
        var notificationAction: NotificationAction,
        var actionValue: String
) {
    constructor() : this(
            "",
            NotificationLevel.INFO,
            NotificationAction.NONE,
            ""
    )
}
