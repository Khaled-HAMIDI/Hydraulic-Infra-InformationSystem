package dz.ade.pfe.web.commons.filemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttacheDocumentDto {
    private String id;
    private String attachmentEntity;
    private String attachmentEntityId;
    private String attachedDocumentType;
    private String attachedDocumentTypeValue;
    private String title;
}
