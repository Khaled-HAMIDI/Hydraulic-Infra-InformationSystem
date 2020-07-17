package dz.ade.pfe.domain.ouvrage;

public enum TraitementStationType {

    MONOBLOC("Monoblocs"),
    ENDUR("Endur"),
    NONE("none");

    private String value;

    TraitementStationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
