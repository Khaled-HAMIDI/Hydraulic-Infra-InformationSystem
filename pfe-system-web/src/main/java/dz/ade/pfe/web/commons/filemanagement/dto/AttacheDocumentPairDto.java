package dz.ade.pfe.web.commons.filemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttacheDocumentPairDto {
    private String attachmentEntityId;
    private String attachmentEntity;
    private String attachedDocumentType;
}
