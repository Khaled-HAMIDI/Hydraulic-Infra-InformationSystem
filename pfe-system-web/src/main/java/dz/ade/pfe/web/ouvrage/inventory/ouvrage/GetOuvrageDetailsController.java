package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.getouvragedetails.GetOuvrageDetailsQuery;
import dz.ade.pfe.web.commons.communes.dto.CommuneListDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage", description = "Operations on ouvrage")
@Component
@RequiredArgsConstructor
public class GetOuvrageDetailsController {

    private final GetOuvrageDetailsQuery getOuvrageDetailsQuery;
    private final OuvrageMapper ouvrageMapper;

    @GetMapping(value = "/ouvrage/{code}")
    @ApiOperation(value = "View a list of available commune by wilaya")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of commune by wilaya"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public OuvrageDto getOuvrageDetails(@PathVariable String code) {
        Ouvrage ouvrage = getOuvrageDetailsQuery.getOuvrageDetails(code);
        return ouvrageMapper.ouvrageToOuvrageDto(ouvrage);
    }
}
