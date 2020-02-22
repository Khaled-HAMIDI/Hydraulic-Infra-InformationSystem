package dz.ade.pfe.print.attachement;

import dz.ade.pfe.commons.filesmanagement.FileStorageProperties;
import dz.ade.pfe.domain.exceptions.FileStorageException;
import dz.ade.pfe.print.JasperServerProperties;
import dz.ade.pfe.print.PrintHelpers;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Locale;
import java.util.Objects;

@Service
class NewRattachementPrintServiceImpl implements NewRattachementPrintService {

    private static final String RATTACHEMENT_TEMPLATE = "rattachement.pdf";

    private Path fileStorageLocation;
    private FileStorageProperties fileStorageProperties;
    private JasperServerProperties jasperServerProperties;
    private RestTemplateBuilder restTemplate;

    public NewRattachementPrintServiceImpl(FileStorageProperties fileStorageProperties,
                                           JasperServerProperties jasperServerProperties,
                                           RestTemplateBuilder restTemplate) {
        this.fileStorageProperties = fileStorageProperties;
        this.jasperServerProperties = jasperServerProperties;
        this.restTemplate = restTemplate;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getPrintDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public void generateRattachementFor(String number, Locale locale) {
        generateRattachement(number, locale);
    }

    private void generateRattachement(String number, Locale locale) {
        try {
            PrintHelpers.createFolders(fileStorageLocation, "Quotation", number);

            File pdfFile = this.fileStorageLocation
                    .resolve("Quotation" + "/"
                            + number + "/" + number + ".pdf").toFile();

            String url = jasperServerProperties.getUrl()
                    + "/"
                    + RATTACHEMENT_TEMPLATE
                    + "?j_username="
                    + jasperServerProperties.getUsername()
                    + "&j_password="
                    + jasperServerProperties.getPassword()
                    + "&num_dossier="
                    + number;

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_OCTET_STREAM));
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<byte[]> response = restTemplate.build()
                    .exchange(url, HttpMethod.GET, entity, byte[].class);
            Files.write(pdfFile.toPath(), Objects.requireNonNull(response.getBody()));
        } catch (Exception e) {
        }
    }
}
