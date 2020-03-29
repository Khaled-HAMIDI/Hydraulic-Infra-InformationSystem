package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.createouvrage.CreateOuvrageQuery;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/ouvrage")
@Api(value = "ouvrage", description = "Operations on ouvrage")
@Component
@RequiredArgsConstructor
public class CreateOuvrageController {

    private final CreateOuvrageQuery createOuvrageQuery;


    @PostMapping
    @ApiOperation(value = "Save an ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an ouvrage"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public String createOuvrage(@RequestBody Ouvrage ouvrage) {
        return createOuvrageQuery.createOuvrage(ouvrage);
    }
}
