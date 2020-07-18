package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageCommand;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.ouvrage.getouvrage.OuvrageShowDto;
import dz.ade.pfe.web.commons.controller.BaseController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage")
@Component
@RequiredArgsConstructor
public class CreateOuvrageController extends BaseController {

    private final CreateOuvrageCommand createOuvrageCommand;

    @PostMapping(value = "/ouvrage")
    @ApiOperation(value = "Save an ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an ouvrage"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public OuvrageShowDto createOuvrage(@RequestBody OuvrageAddDto ouvrageAddDto) {
        return createOuvrageCommand.createOuvrage(ouvrageAddDto, ouvrageAddDto.getCenter());
    }


}
