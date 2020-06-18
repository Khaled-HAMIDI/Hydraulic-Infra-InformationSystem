package dz.ade.pfe.service.inventory.createinventorycomponent;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import dz.ade.pfe.port.in.inventory.createinventorycomponent.CreateInventoryComponentCommand;
import dz.ade.pfe.port.out.inventory.saveinventorycomponent.SaveInventoryComponent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateInventoryComponentService implements CreateInventoryComponentCommand {

    private final CreateInventoryComponentMapper createInventoryComponentMapper;
    private final SaveInventoryComponent saveInventoryComponent;

    @Override
    public InventoryComponentAddDto createInventoryComponent(InventoryComponentAddDto inventoryComponentAddDto,String codeInventory,String codeOuvrage) {

        InventoryComponent toSave = createInventoryComponentMapper.inventoryComponentAddDtoToInventoryComponent(inventoryComponentAddDto);
        return createInventoryComponentMapper.inventoryComponentToInventoryComponentAddDto(saveInventoryComponent.saveInventoryComponent(toSave,codeInventory,codeOuvrage));
    }
}
