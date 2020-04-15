package dz.ade.pfe.web.ouvrage.inventory.inventory;


import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.inventory.getouvragebyinventory.GetOuvrageByInventoryQuery;
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
@Api(value = "inventory", description = "Obtenir la liste des ouvrages dans un inventaire")
@Component
@RequiredArgsConstructor

public class GetOuvrageByInventoryController {
    private final GetOuvrageByInventoryQuery getOuvrageByInventoryQuery;

    @GetMapping(value = "/inventory/{code}/ouvrage")
    @ApiOperation(value = "Obtenir la liste des ouvrages inventoriés dans un inventaire")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of ouvrages"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<Ouvrage> getOuvrageByInventory(@PathVariable(value = "code") String code) {
        return getOuvrageByInventoryQuery.getOuvrageByInventory(code);
    }
}
