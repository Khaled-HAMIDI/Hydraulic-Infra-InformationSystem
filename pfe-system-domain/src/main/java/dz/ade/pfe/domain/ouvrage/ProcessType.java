package dz.ade.pfe.domain.ouvrage;

public enum ProcessType {

    TES("TraitementEauxSurface"),
    DM("Déminéralisation"),
    DF("Deférrisation"),
    NONE("none");

    private String value;

    ProcessType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

