package dz.ade.pfe.commons.filesmanagement;

import dz.ade.pfe.domain.commons.AttachedDocument;
import dz.ade.pfe.domain.commons.AttachedDocumentType;

import java.util.List;
import java.util.Optional;

interface AttachedDocumentRepository {

    AttachedDocument save(AttachedDocument attachedDocument);

    Optional<AttachedDocument> findByAttachmentEntityAndAttachmentEntityIdAndAttachedDocumentType(
            String attachmentEntity, String attachmentEntityId,
            AttachedDocumentType attachedDocumentType);

    List<AttachedDocument> findByAttachmentEntityAndAttachmentEntityId(
            String attachmentEntity, String attachmentEntityId);

    void updateAttachmentEntityId(String attachmentEntityId, String newAttachmentEntityId,
                                  String attachmentEntity);
}
