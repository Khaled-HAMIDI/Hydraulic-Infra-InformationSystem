package dz.ade.pfe.domain.commons;

import java.util.stream.Stream;

/**
 * @author kabouche
 * @version 1.0
 * @created 5/27/2018
 */
public enum AttachedDocumentType {
    OUVRAGE_EXAMPLE("Ouvrage example"),
    AUTRE("Autre"),
    ATTACHEMENT("Attachement");

    private String value;
    private String name;

    AttachedDocumentType(String value) {
        this.value = value;
        this.name = this.name();
    }

    public String getValue() {
        return value;
    }
    public String getName() {
        return name;
    }

    public static AttachedDocumentType of(String value) {
        return Stream.of(AttachedDocumentType.values())
                .filter(p -> p.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
