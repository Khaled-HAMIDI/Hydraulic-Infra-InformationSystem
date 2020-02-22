package dz.ade.pfe.commons.notification.mapper;

import dz.ade.pfe.domain.commons.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationDtoNotificationMapper {

    @Mappings(
            @Mapping(source = "code", target = "id")
    )
    ListNotificationDto convertNotificationToListNotificationDto(Notification notification);

    List<ListNotificationDto> convertNotificationToListNotificationDto(List<Notification> notifications);

    Notification convertNewNotificationDtoNotification(NewNotificationDto newNotificationDto);

    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "user.username", target = "user")
    })
    ShowNotificationDto convertNotificationToShowNotificationDto(Notification notification);

    List<ShowNotificationDto> convertNotificationToShowNotificationDto(List<Notification> notifications);
}
