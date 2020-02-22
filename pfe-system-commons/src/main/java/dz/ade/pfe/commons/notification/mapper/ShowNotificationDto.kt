package dz.ade.pfe.commons.notification.mapper

import dz.ade.pfe.domain.commons.NotificationAction
import dz.ade.pfe.domain.commons.NotificationLevel
import java.util.*

data class ShowNotificationDto(
        var id: String,
        var code: String,
        var message: String,
        var date: Date,
        var notificationLevel: NotificationLevel,
        var notificationAction: NotificationAction,
        var actionValue: String,
        var user: String
) {
    constructor() : this(
            "",
            "",
            "",
            Date(),
            NotificationLevel.INFO,
            NotificationAction.NONE,
            "",
            ""
    )
}
