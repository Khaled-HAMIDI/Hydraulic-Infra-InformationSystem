package dz.ade.pfe.web.printreports;

import dz.ade.pfe.port.in.user.printficheuserreport.PrintFicheUserReportQuery;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/print")
@Api(value = "printReports")
@RequiredArgsConstructor
public class PrintReportsController {
    private final static String MEDIA_TYPE = "application/pdf";

    private final PrintFicheUserReportQuery printFicheUserReportQuery;

    @PostMapping(value = "/ficheUser/{employeeCode}")
    @ApiOperation(value = "Generate fiche user for request")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully generated fiche user"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<Resource> generateFicheUserReportUseCase(@PathVariable(name = "employeeCode") String employeeCode) {
        Resource resource = printFicheUserReportQuery.generateFicheUserReportResource(employeeCode);

        return ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.parseMediaType(MEDIA_TYPE))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"ficheUser.pdf\"")
                .body(resource);
    }
}
