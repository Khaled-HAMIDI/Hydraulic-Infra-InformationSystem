package dz.ade.pfe.domain.ouvrage;

public enum OuvrageFormType {

    CARRE("Carre"),
    RECTANGULAIRE("Rectangulaire"),
    CIRCULAIRE("Circulaire"),
    NONE("none");

    private String value;

    OuvrageFormType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
