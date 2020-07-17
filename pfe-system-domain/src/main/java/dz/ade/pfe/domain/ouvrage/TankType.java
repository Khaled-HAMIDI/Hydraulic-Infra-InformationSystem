package dz.ade.pfe.domain.ouvrage;

public enum TankType {

    ENTIRI("Entiri"),
    SEMIENTIRI("SemiEntiri"),
    SURLEVE("Surleve"),
    NONE("none");

    private String value;

    TankType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
