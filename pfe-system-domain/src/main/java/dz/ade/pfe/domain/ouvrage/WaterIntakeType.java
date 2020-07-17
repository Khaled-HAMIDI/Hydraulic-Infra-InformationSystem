package dz.ade.pfe.domain.ouvrage;

public enum WaterIntakeType {

    BACHEACCUMULATION("BacheAccumulation"),
    CAPTAGE("Captage"),
    BARGEFLOTTANTE("BargeFlottante"),
    NONE("none");

    private String value;

    WaterIntakeType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
