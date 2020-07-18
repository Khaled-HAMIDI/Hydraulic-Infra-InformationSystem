package dz.ade.pfe.domain.ouvrage;

public enum WaterIntakeType {

    BACHEACCUMULATION("Bache d'accumulation"),
    CAPTAGE("Captage"),
    BARGEFLOTTANTE("Barge flottante"),
    NONE("none");

    private String value;

    WaterIntakeType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
