package dz.ade.pfe.domain.commons;

import java.util.stream.Stream;

/**
 * @author kabouche
 * @version 1.0
 * @created 5/27/2018
 */
public enum AttachedDocumentType {
    PERMISSION_DE_VOIERIE("Permission de voirie"),
    CONTRAT_DE_LOCATION("Contrat de location"),
    PIECE_IDENTITIE("Pièce d'identité"),
    PIECE_EXONERATION_TVA("Pièce exénoration tva"),
    DEMANDE_CLIENT("Demande client"),
    NRC("NRC"), NIS("NIS"),
    FICHE_ENQUETE("Fiche enquête"),
    ACT_NAISSANCE("Act de naissance"),
    TITRE_OCCUPATION("Titre d'occupation"),
    CONTRACT_SIGNE("Contrat signé"),
    JUSTIFICATION_RESILIATION("Justification de résiliation"),
    RAPPORT_CONTRADICTOIRE("Rapport contradictoire"),
    AUTRE("Autre"),
    ATTACHEMENT("Attachement"),
    BC("Bon de commande"),
    PV_PASSATION("PV de passation"),
    PV_ARRET("PV d'arret");

    private String value;
    private String name;

    AttachedDocumentType(String value) {
        this.value = value;
        this.name = this.name();
    }

    public String getValue() {
        return value;
    }
    public String getName() {
        return name;
    }

    public static AttachedDocumentType of(String value) {
        return Stream.of(AttachedDocumentType.values())
                .filter(p -> p.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
