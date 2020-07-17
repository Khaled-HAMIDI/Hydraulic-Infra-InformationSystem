package dz.ade.pfe.domain.ouvrage;

public enum ElectricGroupType {

    GPH("Gph"),
    GPV("Gpv"),
    NONE("none");

    private String value;

    ElectricGroupType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
