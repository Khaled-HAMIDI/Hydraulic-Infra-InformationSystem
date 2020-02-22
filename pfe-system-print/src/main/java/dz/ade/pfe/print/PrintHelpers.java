package dz.ade.pfe.print;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class PrintHelpers {

    public static void createFolders(Path fileStorageLocation, String attachmentEntity, String entityId) throws IOException {
        Path attachmentEntityPath = fileStorageLocation.resolve(attachmentEntity);
        Path attachmentEntityIdPath = fileStorageLocation.resolve(attachmentEntity + "/" + entityId);

        if (!Files.exists(attachmentEntityPath)) {
            Files.createDirectory(attachmentEntityPath);
        }
        if (!Files.exists(attachmentEntityIdPath)) {
            Files.createDirectory(attachmentEntityIdPath);
        }
    }
}
