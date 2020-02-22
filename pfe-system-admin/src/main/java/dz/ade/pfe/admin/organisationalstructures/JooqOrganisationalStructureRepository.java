package dz.ade.pfe.admin.organisationalstructures;


import java.util.List;

interface JooqOrganisationalStructureRepository {

    int detachHeadsOfOrganisationalStructure(List<String> usernames);

}
