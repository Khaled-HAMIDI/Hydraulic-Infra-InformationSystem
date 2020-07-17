package dz.ade.pfe.domain.ouvrage;

public enum TankRole {

    TAMPON("Tampon"),
    DISTRIBUTION("Distribution"),
    BACHAHAUT("Bacheahaut"),
    NONE("none");

    private String value;

    TankRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
