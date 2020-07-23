package dz.ade.pfe.domain.ouvrage;

public enum OuvrageType {
    SC("Station de Traitement Conventionelle"),
    SN("Station de Traitement Non Conventionelle"),
    RE("Reservoir"),
    FO("Forage, Puis, Source"),
    SP("Station de Pompage"),
    BC("Brise Charge");
    private String value;

    OuvrageType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

