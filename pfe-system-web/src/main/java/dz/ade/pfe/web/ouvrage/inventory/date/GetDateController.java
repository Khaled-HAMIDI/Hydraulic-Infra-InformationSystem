package dz.ade.pfe.web.ouvrage.inventory.date;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Date", description = "Recuperer la date current")
@Component
@RequiredArgsConstructor
public class GetDateController {
    @GetMapping(value = "/date")
    @ApiOperation(value = "View a list of available commune by wilaya")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of commune by wilaya"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public LocalDate getCurrentDate(){
        return LocalDate.now();
    }
}
