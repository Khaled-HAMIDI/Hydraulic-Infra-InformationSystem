package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.commons.NotificationAction;
import dz.ade.pfe.domain.commons.NotificationLevel;
import dz.ade.pfe.domain.ouvrage.OuvrageType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage", description = "Operations on ouvrage")
@Component
@RequiredArgsConstructor
public class GetOuvrageTypes {
    @GetMapping(value = "/ouvrage/type")
    @ApiOperation(value = "get an ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved an ouvrage"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<Types> getOuvrageTypes(){
        List<Types> types = new ArrayList();
        OuvrageType[] ouvrageTypes =  OuvrageType.values();
        for(OuvrageType action : ouvrageTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }
}
