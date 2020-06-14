package dz.ade.pfe.domain.ouvrage;

public enum OuvrageType {
    StationTraitementConventionelle("Station de Traitement Conventionelle"),
    StationTraitementNonConventionelle("Station de Traitement Non Conventionelle"),
    Reservoir("Reservoir"),
    Forage("Forage"),
    StationPompage("Station de Pompage"),
    BriseCharge("Brise Charge");
    private String value;

    OuvrageType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

