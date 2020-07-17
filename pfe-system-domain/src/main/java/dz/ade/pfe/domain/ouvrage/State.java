package dz.ade.pfe.domain.ouvrage;

import java.util.stream.Stream;

public enum State {

    GOOD("Bon"),
    AVERAGE("Moyen"),
    BAD("Mauvais"),
    NONE("none");

    private String value;

    State(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }


}
