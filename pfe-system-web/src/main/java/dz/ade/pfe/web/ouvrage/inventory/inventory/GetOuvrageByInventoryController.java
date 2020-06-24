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
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping(value = "/inventory/current/ouvrages")
    @ApiOperation(value = "Obtenir la liste des ouvrages inventoriés de l'inventaire courant")
    public List<OuvrageInventoryDto> getOuvrageByCurrentInventory(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getOuvrageByCurrentInventory(codeUser);
    }

    @GetMapping(value = "/inventory/{inventoryCode}/ouvrages")
    @ApiOperation(value = "Obtenir la liste des ouvrages inventoriés d'un inventaire donné")
    public List<OuvrageInventoryDto> getOuvrageByInventory(@PathVariable(value = "inventoryCode") String inventoryCode,HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getOuvrageByInventory(inventoryCode,codeUser);
    }

    @GetMapping(value = "/inventory/current/ouvrages/status")
    @ApiOperation(value = "Obtenir la liste des status d'ouvrages dans l'inventaire courant")
    public List<Boolean> getOuvrageStatusByInventory(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getOuvrageStatusByInventory(codeUser);
    }

    @GetMapping(value = "/inventory/current/ouvrages/dates")
    @ApiOperation(value = "Obtenir la liste des dates de validatioin des ouvrages de l'inventaire courant")
    public List<LocalDate> getDateByOuvrage(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getDateByOuvrage(codeUser);
    }

    @GetMapping(value = "/inventory/{inventoryCode}/ouvrages/dates")
    @ApiOperation(value = "Obtenir la liste des dates de validatioin des ouvrages de l'inventaire courant")
    public List<LocalDate> getDateByOuvrageByInventory(@PathVariable(value = "inventoryCode") String inventoryCode,HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getDateByOuvrageByInventory(inventoryCode,codeUser);
    }

    @GetMapping(value = "/inventory/current/startdate")
    @ApiOperation(value = "Obtenir la date de début de l'inventaire courant")
    public LocalDate getInventoryDate(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getInventoryDate(codeUser);
    }

    @GetMapping(value = "/inventory/current")
    public InventoryShowDto getCurrentInventory(HttpServletRequest httpServletRequest) {

        String unitCode= securityUtils.getConnectedUserOrganisationalStructureId(httpServletRequest);
        return getOuvrageByInventoryQuery.getCurrentInventory(unitCode);
    }
}
