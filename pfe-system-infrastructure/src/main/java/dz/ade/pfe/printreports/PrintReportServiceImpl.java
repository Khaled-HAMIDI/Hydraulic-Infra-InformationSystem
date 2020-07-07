package dz.ade.pfe.printreports;

import dz.ade.pfe.common.report.PrintReportService;
import dz.ade.pfe.commons.filesmanagement.FileStorageProperties;
import dz.ade.pfe.domain.exceptions.FileStorageException;
import dz.ade.pfe.common.report.ReportsGenerator;
import dz.ade.pfe.printreports.exceptions.PrintPdfException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import org.springframework.core.io.Resource;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
class PrintReportServiceImpl implements PrintReportService {

    private Path fileStorageLocation;
    private FileStorageProperties fileStorageProperties;
    private ReportsGenerator reportsGenerator;

    public PrintReportServiceImpl(FileStorageProperties fileStorageProperties, ReportsGenerator reportsGenerator) {
        this.reportsGenerator = reportsGenerator;
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
    public String generateReportPath(Map<String, String> params, String reportId) {
        try {
            String fileName = UUID.randomUUID().toString();
            File pdfFile = this.fileStorageLocation.resolve(fileName + ".pdf").toFile();

            byte[] fileContent = reportsGenerator.generate(params, reportId);
            Files.write(pdfFile.toPath(), Objects.requireNonNull(fileContent));

            return fileName;
        } catch (Exception e) {
            throw new PrintPdfException("Error while generating PDF");
        }
    }

    @Override
    public Resource generateReportResource(Map<String, String> params, String reportId) {
        try {
            byte[] fileContent = reportsGenerator.generate(params, reportId);
            return new ByteArrayResource(fileContent);
        } catch (Exception e) {
            throw new PrintPdfException("Error while generating PDF");
        }
    }
}
