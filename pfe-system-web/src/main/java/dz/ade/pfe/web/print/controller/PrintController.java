package dz.ade.pfe.web.print.controller;

import dz.ade.pfe.print.PrintFileStorageComponent;
import dz.ade.pfe.print.attachement.NewRattachementPrintService;
import dz.ade.pfe.web.print.dto.PrintDto;
import dz.ade.pfe.web.security.auth.TokenHelper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.Locale;

@RestController
@RequestMapping(value = "/api/print")
@Api(value = "print", description = "Operations to generate pdfs")
public class PrintController {

    private PrintFileStorageComponent printFileStorageComponent;
    private NewRattachementPrintService newRattachementPrintService;
    private TokenHelper tokenHelper;

    @Value("${app.domain}")
    private String appDomain;

    public PrintController(PrintFileStorageComponent printFileStorageComponent,
                          NewRattachementPrintService newRattachementPrintService,
                           TokenHelper tokenHelper
    ) {
        this.printFileStorageComponent = printFileStorageComponent;
        this.newRattachementPrintService = newRattachementPrintService;
        this.tokenHelper = tokenHelper;
    }

    @GetMapping("/{entitySimpleName}/{entityId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable(name = "entitySimpleName") String entitySimpleName,
                                                 @PathVariable(name = "entityId") String entityId)
            throws MalformedURLException {
        Resource resource = printFileStorageComponent.loadFileAsResource(entitySimpleName
                + "/" + entityId + "/" + entityId + ".pdf");

        String mediaType = "application/pdf";

        return ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.parseMediaType(mediaType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
                        + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping(value = "/rattachement/{requestId}")
    @ApiOperation(value = "Generate attachement for request")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully generated attachement"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public PrintDto generateRattachementReport(@PathVariable(name = "requestId") String requestId) throws MalformedURLException {
        newRattachementPrintService.generateRattachementFor(requestId, Locale.FRANCE);

        String path = String.format("%s/api/print/%s/%s", appDomain, "Quotation", requestId);

        return new PrintDto(path);
    }

}
