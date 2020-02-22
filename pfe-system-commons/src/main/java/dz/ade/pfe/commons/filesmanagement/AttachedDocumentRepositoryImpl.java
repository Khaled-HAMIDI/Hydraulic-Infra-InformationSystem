package dz.ade.pfe.commons.filesmanagement;

import dz.ade.pfe.domain.commons.AttachedDocument;
import dz.ade.pfe.domain.commons.AttachedDocumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

interface AttachedDocumentRepositoryImpl extends AttachedDocumentRepository,
        JpaRepository<AttachedDocument, Long> {

    @Override
    Optional<AttachedDocument> findByAttachmentEntityAndAttachmentEntityIdAndAttachedDocumentType(
            String attachmentEntity,
            String attachmentEntityId,
            AttachedDocumentType attachedDocumentType);

    @Override
    List<AttachedDocument> findByAttachmentEntityAndAttachmentEntityId(
            String attachmentEntity,
            String attachmentEntityIde);

    @Transactional
    @Modifying
    @Query(value = "UPDATE AttachedDocument SET attachmentEntityId = :newAttachmentEntityId " +
            "WHERE attachmentEntityId = :attachmentEntityId " +
            "AND attachmentEntity = :attachmentEntity")
    void updateAttachmentEntityId(@Param("attachmentEntityId") String attachmentEntityId,
                                  @Param("newAttachmentEntityId") String newAttachmentEntityId,
                                  @Param("attachmentEntity") String attachmentEntity);
}
