package dz.ade.pfe.service.inventory.createinventory;


import dz.ade.pfe.commons.UseCaseExecutor;
import dz.ade.pfe.commons.notification.mapper.NewNotificationDto;
import dz.ade.pfe.commons.notification.usecases.CreateNotificationForUser;
import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.domain.commons.NotificationAction;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.port.in.inventory.createinventory.CreateInventoryCommand;

import dz.ade.pfe.port.out.inventory.createinventory.SaveInventory;
import dz.ade.pfe.port.out.inventory.saveinventorycomponent.SaveInventoryComponent;
import dz.ade.pfe.port.out.inventory.saveinventoryouvrage.SaveInventoryOuvrage;
import dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage.LoadComposantByOuvrage;
import dz.ade.pfe.port.out.ouvrage.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import dz.ade.pfe.port.out.user.loadbyusername.LoadUserByUsername;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final SaveInventoryComponent saveInventoryComponent;
    private final LoadUserByUsername loadUserByUsername;
    private final ReturnInventoryMapper returnInventoryMapper;
    private final LoadUnitByCode loadUnitByCode;
    private final LoadOuvragesByCodes loadOuvragesByCodes;
    private final LoadComposantByOuvrage loadComposantByOuvrage;

    @Autowired
    private UseCaseExecutor useCaseExecutor;

    @Autowired
    private CreateNotificationForUser createNotificationForUser;


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
        inventory.setDate(inventoryAddDto.getDate());

        Inventory inventory1 = saveInventory.saveInventory(inventory);

        List<ResponsableOuvrageType> responsablesOuvrage = inventoryAddDto.getResponsablesOuvrage();
        responsablesOuvrage.stream()
                .forEach((responsableOuvrage) -> {

                    Ouvrage ouvrage =loadOuvragesByCodes.loadOuvrageByCode(responsableOuvrage.ouvrage);
                    User responsable =loadUserByUsername.loadUserByUsername(responsableOuvrage.responsable).get();

                    saveInventoryOuvrage.saveInventoryOuvrage(new InventoryOuvrage(null, inventory1,
                            ouvrage, responsable,false,null));


                    // Notification
                    String message =String.format("Vous avez un nouvel ouvrage à inventorier ayant le code %s",responsableOuvrage.ouvrage);
                    NewNotificationDto newNotificationDto = new NewNotificationDto();
                    newNotificationDto.setMessage(message);
                    newNotificationDto.setNotificationAction(NotificationAction.ROUTE);
                    newNotificationDto.setActionValue("/patrimony/inventory/current/" +inventory1.getCode()+ "/" +ouvrage.getType()+"/" +ouvrage.getCode());

                    useCaseExecutor.execute(
                            createNotificationForUser,
                            new CreateNotificationForUser.InputValues(responsableOuvrage.responsable, newNotificationDto),
                            CreateNotificationForUser.OutputValues::getShowNotificationDtos);


                    // End notification
                    List<Component> components = loadComposantByOuvrage.loadAll(responsableOuvrage.ouvrage);
                    components.forEach((component) -> {
                        switch (component.getComponentType()){

                            case EquipementStationTraitement:
                                TraitementStationEquipement traitementStationEquipement = (TraitementStationEquipement) component;
                                saveInventoryComponent.setInventoryComponent(new InventoryComponent(null,traitementStationEquipement.getTypeEquipement(),inventory1,ouvrage,State.Bon,((TraitementStationEquipement) component).getNumber()," "," ",false));
                                break;

                            case ComposantHydroMecanique:
                                HedromecaEquipment hedromecaEquipment = (HedromecaEquipment) component;
                                saveInventoryComponent.setInventoryComponent(new InventoryComponent(null,hedromecaEquipment.getEquipementType(),inventory1,ouvrage,State.Bon,((HedromecaEquipment) component).getNumber()," "," ",false));
                                break;

                            case PosteChimique:
                                ChemicalPosts chemicalPost = (ChemicalPosts) component;
                                saveInventoryComponent.setInventoryComponent(new InventoryComponent(null,chemicalPost.getPostType(),inventory1,ouvrage,State.Bon,((ChemicalPosts) component).getPumpNumber()," "," ",false));
                                break;

                            default:
                                saveInventoryComponent.setInventoryComponent(new InventoryComponent(null,component.getComponentType().toString(),inventory1,ouvrage,State.Bon,1.0," "," ",false));
                        }
                    });

                });

        return returnInventoryMapper.ReturnInventory(inventory1);
    }
}
