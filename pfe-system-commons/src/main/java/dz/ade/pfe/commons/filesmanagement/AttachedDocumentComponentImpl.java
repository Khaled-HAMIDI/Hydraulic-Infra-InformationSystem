package dz.ade.pfe.commons.filesmanagement;

import dz.ade.pfe.domain.commons.AttachedDocument;
import dz.ade.pfe.domain.commons.AttachedDocumentType;
import dz.ade.pfe.domain.commons.AttachmentEntity;
import dz.ade.pfe.domain.commons.FileExtension;
import dz.ade.pfe.domain.exceptions.FileNotFoundException;
import dz.ade.pfe.domain.exceptions.FileStorageException;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * amine kabouche
 * version 1.0
 * created 2/05/2019
 */
@Component
class AttachedDocumentComponentImpl implements AttachedDocumentComponent {

    private Path fileStorageLocation;
    private AttachedDocumentRepository attachedDocumentRepository;
    private JooqAttachedDocumntRepository jooqAttachedDocumntRepository;

    @Autowired
    public AttachedDocumentComponentImpl(FileStorageProperties fileStorageProperties,
                                         AttachedDocumentRepository attachedDocumentRepository,
                                         JooqAttachedDocumntRepository jooqAttachedDocumntRepository) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }

        this.attachedDocumentRepository = attachedDocumentRepository;
        this.jooqAttachedDocumntRepository = jooqAttachedDocumntRepository;
    }

    public String storeFile(MultipartFile file, AttachmentEntity attachmentEntity,
                            String attachmentEntityId,
                            AttachedDocumentType attachedDocumentType) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String mediaType = file.getContentType();

        String extension = fileName.lastIndexOf('.') == -1 ? "" :
                fileName.substring(fileName.lastIndexOf('.') + 1);
        FileExtension fileExtension = FileExtension.valueOf(extension);

        if (fileName.contains("..")) {
            throw new FileStorageException("Filename contains invalid path sequence " + fileName);
        }

        Path targetLocation = this.fileStorageLocation
                .resolve(attachmentEntity.name() + "/" + attachmentEntityId
                        + "/" + attachedDocumentType);

        createFolders(attachmentEntity.name(), attachmentEntityId);

        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new FileStorageException("Couldn't create file %s" + attachedDocumentType);
        }

        AttachedDocument attachedDocument = AttachedDocument.builder()
                .attachmentEntity(attachmentEntity.toString())
                .attachmentEntityId(attachmentEntityId)
                .pathToScannedDocument(targetLocation.toString())
                .attachedDocumentType(attachedDocumentType)
                .mediaType(mediaType)
                .fileExtension(fileExtension)
                .uploadDate(LocalDateTime.now())
                .build();

        Optional<AttachedDocument> attachedDocumentOptional = getAttachedDocument(attachmentEntity, attachmentEntityId, attachedDocumentType);
        if (!attachedDocumentOptional.isPresent()) {
            attachedDocumentRepository.save(attachedDocument);
        } else {
            attachedDocumentOptional.get().setFileExtension(fileExtension);
            attachedDocumentOptional.get().setPathToScannedDocument(targetLocation.toString());
            attachedDocumentOptional.get().setMediaType(mediaType);
            attachedDocumentOptional.get().setUploadDate(LocalDateTime.now());
            attachedDocumentRepository.save(attachedDocumentOptional.get());
        }

        return attachedDocumentType.toString();
    }

    public Resource loadFileAsResource(String fileName) {
        Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
        } catch (MalformedURLException e) {
            throw new FileStorageException(String.format("Could not load file %s",
                    fileName));
        }

        if (resource.exists()) {
            return resource;
        } else {
            throw new FileNotFoundException("File not found " + fileName);
        }
    }

    @Override
    public Optional<AttachedDocument> getAttachedDocument(AttachmentEntity attachmentEntity,
                                                          String attachmentEntityId,
                                                          AttachedDocumentType attachedDocumentType) {
        return attachedDocumentRepository.findByAttachmentEntityAndAttachmentEntityIdAndAttachedDocumentType(
                attachmentEntity.toString(), attachmentEntityId, attachedDocumentType);
    }

    private void createFolders(String attachmentEntity, String attachmentEntityId) {
        Path attachmentEntityPath = this.fileStorageLocation.resolve(attachmentEntity);
        Path attachmentEntityIdPath = this.fileStorageLocation.resolve(attachmentEntity + "/" + attachmentEntityId);

        if (!attachmentEntityPath.toFile().exists()) {
            try {
                Files.createDirectory(attachmentEntityPath);
            } catch (IOException e) {
                throw new FileStorageException(String.format("Could not create folder %s",
                        attachmentEntity));
            }
        }

        if (!attachmentEntityIdPath.toFile().exists()) {
            try {
                Files.createDirectory(attachmentEntityIdPath);
            } catch (IOException e) {
                throw new FileStorageException(String.format("Could not create folder %s",
                        attachmentEntityId));
            }
        }
    }

    @Override
    public List<AttachedDocument> getAttachedDocuments(AttachmentEntity attachmentEntity,
                                                       String attachmentEntityId) {
        return attachedDocumentRepository.findByAttachmentEntityAndAttachmentEntityId(
                attachmentEntity.toString(), attachmentEntityId);
    }

    @Override
    public void updateAttachmentEntityId(String attachmentEntityId, String newAttachmentEntityId,
                                         String attachmentEntity) {
        Path sourceAttachmentEntityIdPath = this.fileStorageLocation.resolve(attachmentEntity
                + "/" + attachmentEntityId);

        try {
            if (sourceAttachmentEntityIdPath.toFile().exists()) {
                Files.move(sourceAttachmentEntityIdPath, sourceAttachmentEntityIdPath.resolveSibling(newAttachmentEntityId),
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new FileStorageException(String.format("Could not rename folder from %s to %s",
                    attachmentEntityId, newAttachmentEntityId));
        }

        attachedDocumentRepository.updateAttachmentEntityId(attachmentEntityId, newAttachmentEntityId,
                attachmentEntity);
    }

    @Override
    public List<AttachedDocument> getAll(List<Pair<String, Pair<String, String>>> pairs){
        return jooqAttachedDocumntRepository.getAttachedDocuments(pairs);
    }
}
