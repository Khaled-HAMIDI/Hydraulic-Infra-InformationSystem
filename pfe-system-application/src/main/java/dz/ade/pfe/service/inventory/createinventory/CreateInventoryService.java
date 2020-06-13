package dz.ade.pfe.service.inventory.createinventory;


import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.port.in.inventory.createinventory.CreateInventoryCommand;

import dz.ade.pfe.port.out.inventory.createinventory.SaveInventory;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import dz.ade.pfe.port.out.user.loadbyusername.LoadUserByUsername;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateInventoryService implements CreateInventoryCommand {
    //@Autowired
    private final SaveInventory saveInventory;
    private final LoadUserByUsername loadUserByUsername;
    private final ReturnInventoryMapper returnInventoryMapper;
    private final LoadUnitByCode loadUnitByCode;

    @Override
    public InventoryShowDto createInventory(InventoryAddDto inventoryAddDto, String unitCode){

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

        return returnInventoryMapper.ReturnInventory(saveInventory.saveInventory(inventory));
    }
}