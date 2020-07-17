package dz.ade.pfe.domain.ouvrage;

public enum WaterIntakeNature {

    FONTE("Fonte"),
    ACIER("Acier"),
    NONE("none");

    private String value;

    WaterIntakeNature(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
