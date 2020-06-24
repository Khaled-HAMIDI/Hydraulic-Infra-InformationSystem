package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.port.in.GetSequelNumber;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory")
@Component
@RequiredArgsConstructor
public class SequelNumberController {
    private final GetSequelNumber getSequelNumber;
    @GetMapping(value = "/next/{type}/{code}")
    @ApiOperation(value = "Save a site")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an inventory"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    Integer getBCNext(@PathVariable String type,@PathVariable String code){
        return getSequelNumber.getNext(type,code);
    }
}
