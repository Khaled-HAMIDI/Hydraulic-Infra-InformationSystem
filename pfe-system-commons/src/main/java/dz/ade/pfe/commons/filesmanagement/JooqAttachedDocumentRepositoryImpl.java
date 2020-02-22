package dz.ade.pfe.commons.filesmanagement;

import org.apache.commons.lang3.tuple.Pair;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class JooqAttachedDocumentRepositoryImpl implements JooqAttachedDocumntRepository {

    private DSLContext dsl;

    public JooqAttachedDocumentRepositoryImpl(DSLContext dsl) {
        this.dsl = dsl;
    }

    @Override
    public List<dz.ade.pfe.domain.commons.AttachedDocument> getAttachedDocuments(List<Pair<String, Pair<String, String>>> triple) {

        return null;

    }
}
