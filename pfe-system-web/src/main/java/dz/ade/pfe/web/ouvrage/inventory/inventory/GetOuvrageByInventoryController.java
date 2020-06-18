package dz.ade.pfe.web.ouvrage.inventory.inventory;


import dz.ade.pfe.port.in.inventory.getouvragebyinventory.GetOuvrageByInventoryQuery;
import dz.ade.pfe.service.inventory.getouvragebyinventory.InventoryShowDto;
import dz.ade.pfe.service.inventory.getouvragebyinventory.OuvrageInventoryDto;
import dz.ade.pfe.web.commons.controller.BaseController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory", description = "Obtenir la liste des ouvrages dans un inventaire  par utilisateur")
@Component
@RequiredArgsConstructor
public class GetOuvrageByInventoryController extends BaseController {
    private final GetOuvrageByInventoryQuery getOuvrageByInventoryQuery;

    @GetMapping(value = "/inventory/ouvrages")
    @ApiOperation(value = "Obtenir la liste des ouvrages inventoriés")
    public List<OuvrageInventoryDto> getOuvrageByInventory(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getOuvrageByInventory(codeUser);
    }

    @GetMapping(value = "/inventory/ouvrages/status")
    @ApiOperation(value = "Obtenir la liste des status d'ouvrages inventoriés")
    public List<Boolean> getOuvrageStatusByInventory(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getOuvrageStatusByInventory(codeUser);
    }

    @GetMapping(value = "/inventory/ouvrages/dates")
    @ApiOperation(value = "Obtenir la liste des dates d'inventaire sur les ouvrages")
    public List<LocalDate> getDateByOuvrage(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getDateByOuvrage(codeUser);
    }

    @GetMapping(value = "/inventory/ouvrages/startdate")
    @ApiOperation(value = "Obtenir la date de début de l'ouvrage")
    public LocalDate getInventoryDate(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getInventoryDate(codeUser);
    }

    @GetMapping(value = "/inventory/current")
    public InventoryShowDto getCurrentInventory(HttpServletRequest httpServletRequest) {

        String unitCode= securityUtils.getConnectedUserOrganisationalStructure(httpServletRequest);
        return getOuvrageByInventoryQuery.getCurrentInventory(unitCode);
    }
}
