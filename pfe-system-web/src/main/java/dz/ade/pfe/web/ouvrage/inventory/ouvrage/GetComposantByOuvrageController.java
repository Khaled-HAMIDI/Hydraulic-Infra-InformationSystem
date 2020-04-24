package dz.ade.pfe.web.ouvrage.inventory.ouvrage;


import dz.ade.pfe.domain.ouvrage.Component;
import dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage.GetComposantByOuvrageQuery;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "composant", description = "Obtenir la liste des composants d'un ouvrage")
@org.springframework.stereotype.Component
@RequiredArgsConstructor

public class GetComposantByOuvrageController {
    private final GetComposantByOuvrageQuery getComposantByOuvrage;

    @GetMapping(value = "/ouvrage/{code}/composants")
    @ApiOperation(value = "Obtenir la liste des composants d'un ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of composant"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<Component> getComposantByOuvrage(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.getComposantByOuvrage(code);
    }
}
