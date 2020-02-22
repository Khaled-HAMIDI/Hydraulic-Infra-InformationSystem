package dz.ade.pfe.commons.notification.mapper

import java.io.Serializable

data class NumberOfNotificationDto(
        var numberOfNotifications: Int,
        var notifications : List<ListNotificationDto>

): Serializable
