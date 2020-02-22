package dz.ade.pfe.web.commons.filemanagement.controller;

import dz.ade.pfe.domain.exceptions.FileNotFoundException;
import dz.ade.pfe.commons.filesmanagement.AttachedDocumentComponent;
import dz.ade.pfe.domain.commons.AttachedDocument;
import dz.ade.pfe.domain.commons.AttachedDocumentType;
import dz.ade.pfe.domain.commons.AttachmentEntity;
import dz.ade.pfe.web.commons.filemanagement.dto.AttacheDocumentDto;
import dz.ade.pfe.web.commons.filemanagement.dto.UploadFileDto;
import dz.ade.pfe.web.commons.filemanagement.mapper.AttacheDocumentDtoAttacheDocumentMapper;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/uploads")
public class FileController {

    private static final String APPLICATION_OCTET_STREAM = "application/octet-stream";

    private AttachedDocumentComponent attachedDocumentComponent;
    private AttacheDocumentDtoAttacheDocumentMapper attacheDocumentDtoAttacheDocumentMapper;

    public FileController(AttachedDocumentComponent attachedDocumentComponent,
                          AttacheDocumentDtoAttacheDocumentMapper attacheDocumentDtoAttacheDocumentMapper) {
        this.attachedDocumentComponent = attachedDocumentComponent;
        this.attacheDocumentDtoAttacheDocumentMapper = attacheDocumentDtoAttacheDocumentMapper;
    }

    @PostMapping("/{attachmentEntity}/{attachmentEntityId}/{attachedDocumentType}")
    public UploadFileDto uploadFile(@RequestParam("file") MultipartFile file,
                                    @PathVariable String attachmentEntity,
                                    @PathVariable String attachmentEntityId,
                                    @PathVariable String attachedDocumentType) {
        String fileName = attachedDocumentComponent.storeFile(file,
                AttachmentEntity.valueOf(attachmentEntity),
                attachmentEntityId,
                AttachedDocumentType.valueOf(attachedDocumentType));

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/uploads/" + attachmentEntity + "/" + attachmentEntityId + "/")
                .path(fileName)
                .toUriString();

        return new UploadFileDto(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @GetMapping("/{attachmentEntity}/{attachmentEntityId}/{attachedDocumentType}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String attachmentEntity,
                                                 @PathVariable String attachmentEntityId,
                                                 @PathVariable String attachedDocumentType) {

        Optional<AttachedDocument> attachedDocument = attachedDocumentComponent
                .getAttachedDocument(AttachmentEntity.valueOf(attachmentEntity),
                        attachmentEntityId, AttachedDocumentType.valueOf(attachedDocumentType));

        if (!attachedDocument.isPresent()) {
            throw new FileNotFoundException("");
        }

        Resource resource = attachedDocumentComponent.loadFileAsResource(attachmentEntity
                + "/" + attachmentEntityId + "/" + attachedDocumentType);

        String mediaType = attachedDocument.get().getMediaType();
        String fileExtension = attachedDocument.get().getFileExtension().toString();

        String contentType = APPLICATION_OCTET_STREAM;
        if (mediaType != null && !mediaType.equals("")) {
            contentType = mediaType;
        }

        return ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename()
                        + "." + fileExtension + "\"")
                .body(resource);
    }

    @GetMapping("/{attachmentEntity}/{attachmentEntityId}")
    public List<AttacheDocumentDto> downloadFiles(@PathVariable String attachmentEntity,
                                                  @PathVariable String attachmentEntityId) {

        List<AttachedDocument> attachedDocuments = attachedDocumentComponent
                .getAttachedDocuments(AttachmentEntity.valueOf(attachmentEntity),
                        attachmentEntityId);

        return attachedDocuments.stream()
                .map(attacheDocument -> attacheDocumentDtoAttacheDocumentMapper.attacheDocumentToAttacheDocumentDto(attacheDocument))
                .collect(Collectors.toList());
    }

    @GetMapping()
    @ApiOperation(value = "View a list of available attachedDocuments")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of attachedDocuments"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<AttacheDocumentDto> getAll(@RequestParam("entities") String entities) {
        if (entities.length() != 0) {
            List<Pair<String, Pair<String, String>>> triples = new ArrayList<>();

            String[] arrOfStr = entities.split(",");
            for (int i = 0; i < arrOfStr.length; i++) {
                String[] arr2 = arrOfStr[i].split(":");
                triples.add(Pair.of(arr2[0], Pair.of(arr2[1], arr2[2])));
            }

            List<AttachedDocument> attacheDocuments = attachedDocumentComponent.getAll(triples);
            return attacheDocumentDtoAttacheDocumentMapper.attacheDocumentToAttacheDocumentDto(attacheDocuments);
        }

        return Collections.EMPTY_LIST;
    }

}
