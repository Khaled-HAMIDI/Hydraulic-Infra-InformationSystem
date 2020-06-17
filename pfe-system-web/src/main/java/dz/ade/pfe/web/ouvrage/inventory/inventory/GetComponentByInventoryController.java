package dz.ade.pfe.web.ouvrage.inventory.inventory;

import dz.ade.pfe.port.in.inventory.getcomponentbyinventory.GetComponentByInventoryQuery;
import dz.ade.pfe.service.inventory.getcomponentbyinventory.InventoryComponentDto;
import dz.ade.pfe.service.inventory.getouvragebyinventory.OuvrageInventoryDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory", description = "Obtenir la liste des composants dans un inventaire")
@Component
@RequiredArgsConstructor
public class GetComponentByInventoryController {

    private final GetComponentByInventoryQuery getComponentByInventoryQuery;

    @GetMapping(value = "/inventory/{inventoryCode}/{ouvrageCode}/composant")
    @ApiOperation(value = "Obtenir la liste des composants inventoriés")
    public List<InventoryComponentDto> getComponentByInventory(@PathVariable(value = "inventoryCode") String inventoryCode, @PathVariable(value = "ouvrageCode") String ouvrageCode) {

        return getComponentByInventoryQuery.getComponentByInventory(inventoryCode,ouvrageCode);
    }
}
