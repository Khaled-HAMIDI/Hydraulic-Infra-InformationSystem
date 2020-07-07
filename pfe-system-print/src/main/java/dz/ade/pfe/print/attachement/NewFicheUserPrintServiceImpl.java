package dz.ade.pfe.print.attachement;

import dz.ade.pfe.commons.filesmanagement.FileStorageProperties;
import dz.ade.pfe.domain.exceptions.FileStorageException;
import dz.ade.pfe.print.JasperServerProperties;
import dz.ade.pfe.print.ReportsGenerator;
import dz.ade.pfe.print.exceptions.PrintPdfException;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
class NewFicheOuvragePrintServiceImpl implements NewFicheOuvragePrintService {

    private static final String FICHE_OUVRAGE_REPORT_ID = "fiche_ouvrage.pdf";

    private Path fileStorageLocation;
    private FileStorageProperties fileStorageProperties;
    private ReportsGenerator reportsGenerator;

    public NewFicheOuvragePrintServiceImpl(FileStorageProperties fileStorageProperties) {
        this.fileStorageProperties = fileStorageProperties;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getPrintDir())
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public String generateFicheOuvrageFor(String code, Locale locale) {
        try {
            String fileName = UUID.randomUUID().toString();
            File pdfFile = this.fileStorageLocation.resolve(fileName + ".pdf").toFile();

            Map<String, String> params = new HashMap<>();
            params.put("code_user", code);

            byte[] fileContent = reportsGenerator.generate(params, FICHE_OUVRAGE_REPORT_ID);
            Files.write(pdfFile.toPath(), Objects.requireNonNull(fileContent));

            return fileName;
        } catch (Exception e) {
            throw new PrintPdfException("Error while generating PDF");
        }
    }
}
