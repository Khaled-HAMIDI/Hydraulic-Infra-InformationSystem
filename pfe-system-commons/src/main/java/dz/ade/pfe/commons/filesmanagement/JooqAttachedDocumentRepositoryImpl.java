package dz.ade.pfe.commons.filesmanagement;

import dz.ade.pfe.domain.jooq.gen.tables.AttachedDocument;
import org.apache.commons.lang3.tuple.Pair;
import org.jooq.Condition;
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

        Condition condition = (AttachedDocument.ATTACHED_DOCUMENT.ATTACHMENT_ENTITY_ID.eq(triple.get(0).getLeft())
                .and(AttachedDocument.ATTACHED_DOCUMENT.ATTACHMENT_ENTITY.eq((triple.get(0)).getRight().getLeft()))
                .and(AttachedDocument.ATTACHED_DOCUMENT.ATTACHED_DOCUMENT_TYPE.eq((triple.get(0)).getRight().getRight())));

        for (int i = 1; i < triple.size(); i++) {
            condition = condition.or(AttachedDocument.ATTACHED_DOCUMENT.ATTACHMENT_ENTITY_ID.eq(triple.get(i).getLeft())
                    .and(AttachedDocument.ATTACHED_DOCUMENT.ATTACHMENT_ENTITY.eq((triple.get(i)).getRight().getLeft()))
                    .and(AttachedDocument.ATTACHED_DOCUMENT.ATTACHED_DOCUMENT_TYPE.eq((triple.get(i)).getRight().getRight())));
        }

        return dsl.select()
                .from(AttachedDocument.ATTACHED_DOCUMENT)
                .where(condition)
                .fetch()
                .into(dz.ade.pfe.domain.commons.AttachedDocument.class);

    }
}
