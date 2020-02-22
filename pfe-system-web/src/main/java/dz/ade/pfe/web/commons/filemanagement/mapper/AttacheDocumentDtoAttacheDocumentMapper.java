package dz.ade.pfe.web.commons.filemanagement.mapper;

import dz.ade.pfe.domain.commons.AttachedDocument;
import dz.ade.pfe.web.commons.filemanagement.dto.AttacheDocumentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttacheDocumentDtoAttacheDocumentMapper {

    @Mappings({
            @Mapping(source = "attachmentEntityId", target = "id"),
            @Mapping(source = "attachedDocumentType.value", target = "attachedDocumentTypeValue"),
            @Mapping(source = "attachedDocumentType.value", target = "title")
    })
    AttacheDocumentDto attacheDocumentToAttacheDocumentDto(AttachedDocument attachedDocument);

    List<AttacheDocumentDto> attacheDocumentToAttacheDocumentDto(List<AttachedDocument> attachedDocument);
}
