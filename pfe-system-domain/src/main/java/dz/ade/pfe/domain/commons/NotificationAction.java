package dz.ade.pfe.domain.commons;

import java.util.stream.Stream;

public enum NotificationAction {
    ROUTE("route"), NONE("none");

    private String value;

    NotificationAction(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static NotificationAction of(String value) {
        return Stream.of(NotificationAction.values())
                .filter(p -> p.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
