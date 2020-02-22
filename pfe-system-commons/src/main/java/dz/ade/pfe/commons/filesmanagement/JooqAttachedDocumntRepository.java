package dz.ade.pfe.commons.filesmanagement;

import dz.ade.pfe.domain.commons.AttachedDocument;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;

interface JooqAttachedDocumntRepository {

    List<AttachedDocument> getAttachedDocuments(List<Pair<String, Pair<String, String>> > triple);
}
