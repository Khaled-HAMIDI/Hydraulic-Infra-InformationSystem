package dz.ade.pfe.web.ouvrage.inventory.ouvrage;


import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.getouvrage.GetOuvrageQuery;
import dz.ade.pfe.port.in.ouvrage.updateouvrage.UpdateOuvrageQuery;
import dz.ade.pfe.service.ouvrage.getouvrage.OuvrageShowDto;
import dz.ade.pfe.service.ouvrage.updateouvrage.OuvrageUpdateDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage", description = "Operations on ouvrage")
@Component
@RequiredArgsConstructor
public class GetOuvrageController {

    private final GetOuvrageQuery getOuvrageQuery;


    @GetMapping(value = "/ouvrage/{code}")
    @ApiOperation(value = "get an ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved an ouvrage"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public OuvrageShowDto getOuvrage(@PathVariable(value = "code") String code) {
        return getOuvrageQuery.getOuvrage(code);
    }
}
