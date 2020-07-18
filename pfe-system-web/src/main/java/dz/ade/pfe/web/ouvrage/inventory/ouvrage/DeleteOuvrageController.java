package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.port.in.ouvrage.deleteouvrage.DeleteOuvrageCommand;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage")
@Component
@RequiredArgsConstructor
public class DeleteOuvrageController {
    private final DeleteOuvrageCommand deleteOuvrageCommand;
    @DeleteMapping(value = "/ouvrage/{code}")
    @ApiOperation(value = "declasser an ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an ouvrage"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public Boolean deleteOuvrage(@PathVariable(value = "code") String code) {
        return deleteOuvrageCommand.deleteOuvrage(code);
    }
}
