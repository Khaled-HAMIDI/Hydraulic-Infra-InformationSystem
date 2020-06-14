package dz.ade.pfe.service.inventory.createinventory;


import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import dz.ade.pfe.port.in.inventory.createinventory.CreateInventoryCommand;

import dz.ade.pfe.port.out.inventory.createinventory.SaveInventory;
import dz.ade.pfe.port.out.inventory.saveinventoryouvrage.SaveInventoryOuvrage;
import dz.ade.pfe.port.out.ouvrage.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import dz.ade.pfe.port.out.user.loadbyusername.LoadUserByUsername;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateInventoryService implements CreateInventoryCommand {
    //@Autowired
    private final SaveInventory saveInventory;
    private final SaveInventoryOuvrage saveInventoryOuvrage;
    private final LoadUserByUsername loadUserByUsername;
    private final ReturnInventoryMapper returnInventoryMapper;
    private final LoadUnitByCode loadUnitByCode;
    private final LoadOuvragesByCodes loadOuvragesByCodes;


    @Transactional
    @Override
    public InventoryShowDto createInventory(InventoryAddDto inventoryAddDto, String unitCode) {

        Inventory inventory = new Inventory();

        inventory.setCode(inventoryAddDto.getCode());
        inventory.setDate(inventoryAddDto.getDate());

        Optional<User> user = loadUserByUsername.loadUserByUsername(inventoryAddDto.getResponsable());
        if (!user.isPresent()) {
            throw new ResourceNotFoundException(String.format("No user found with username '%s'.", inventoryAddDto.getResponsable()));
        }

        Optional<OrganisationalStructure> unit = loadUnitByCode.loadUnitByCode(unitCode);
        if (!unit.isPresent()) {
            throw new ResourceNotFoundException(String.format("No unit found with code '%s'.", unitCode));
        }
        inventory.setUnit(unit.get());
        inventory.setHeadOfTheInventory(user.get());
        inventory.setCompleted(inventoryAddDto.getCompleted());

        Inventory inventory1 = saveInventory.saveInventory(inventory);

        List<ResponsableOuvrageType> responsablesOuvrage = inventoryAddDto.getResponsablesOuvrage();
        responsablesOuvrage.stream()
                .forEach((responsableOuvrage) -> {
                    saveInventoryOuvrage.saveInventoryOuvrage(new InventoryOuvrage(null, inventory1,
                            loadOuvragesByCodes.loadOuvrageByCode(responsableOuvrage.ouvrage),
                            loadUserByUsername.loadUserByUsername(responsableOuvrage.responsable).get(),false));
                });

        return returnInventoryMapper.ReturnInventory(inventory1);
    }
}
