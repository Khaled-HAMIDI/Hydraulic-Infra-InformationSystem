package dz.ade.pfe.domain.ouvrage;

public enum InjectionType {

    MANUEL("Manuel"),
    AUTOMATIQUE("Automatique"),
    NONE("none");

    private String value;

    InjectionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
