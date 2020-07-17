package dz.ade.pfe.domain.ouvrage;

public enum SourceType {

    BARRAGE("Barrage"),
    OUED("Oued"),
    FORAGE("Forage"),
    SOURCE("Source"),
    NONE("none");

    private String value;

    SourceType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
