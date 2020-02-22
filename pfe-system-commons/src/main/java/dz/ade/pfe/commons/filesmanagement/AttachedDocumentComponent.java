package dz.ade.pfe.commons.filesmanagement;

import dz.ade.pfe.domain.commons.AttachedDocument;
import dz.ade.pfe.domain.commons.AttachedDocumentType;
import dz.ade.pfe.domain.commons.AttachmentEntity;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 2/05/2019
 */
public interface AttachedDocumentComponent {

    String storeFile(MultipartFile file, AttachmentEntity attachmentEntity,
                     String attachmentEntityId,
                     AttachedDocumentType attachedDocumentType);

    Resource loadFileAsResource(String fileName);

    Optional<AttachedDocument> getAttachedDocument(AttachmentEntity attachmentEntity,
                                                   String attachmentEntityId,
                                                   AttachedDocumentType attachedDocumentType);

    List<AttachedDocument> getAttachedDocuments(AttachmentEntity attachmentEntity,
                                                String attachmentEntityId);

    void updateAttachmentEntityId(String attachmentEntityId, String newAttachmentEntityId,
                                              String attachmentEntity);

        List<AttachedDocument> getAll(List<Pair<String, Pair<String, String>>> pairs);
}
