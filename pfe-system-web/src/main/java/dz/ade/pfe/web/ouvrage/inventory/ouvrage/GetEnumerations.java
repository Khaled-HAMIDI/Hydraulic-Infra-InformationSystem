package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.*;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage", description = "Operations on ouvrage")
@Component
@RequiredArgsConstructor
public class GetEnumerations {

    @GetMapping(value = "/enum/typeOuvrage")
    public List<Types> getOuvrageTypes(){
        List<Types> types = new ArrayList();
        OuvrageType[] ouvrageTypes =  OuvrageType.values();
        for(OuvrageType action : ouvrageTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/state")
    public List<Types> getStates(){
        List<Types> types = new ArrayList();
        State[] states =  State.values();
        for(State action : states){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/sourceType")
    public List<Types> getSourceType(){
        List<Types> types = new ArrayList();
        SourceType[] sourceTypes =  SourceType.values();
        for(SourceType action : sourceTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/electricGroupType")
    public List<Types> getElectricGroupType(){
        List<Types> types = new ArrayList();
        ElectricGroupType[] groupTypes =  ElectricGroupType.values();
        for(ElectricGroupType action : groupTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/injectionType")
    public List<Types> getInjectionType(){
        List<Types> types = new ArrayList();
        InjectionType[] injectionTypes =  InjectionType.values();
        for(InjectionType action : injectionTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/tankRole")
    public List<Types> getTankRole(){
        List<Types> types = new ArrayList();
        TankRole[] tankRoles =  TankRole.values();
        for(TankRole action : tankRoles){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/tankType")
    public List<Types> getTankType(){
        List<Types> types = new ArrayList();
        TankType[] tankTypes =  TankType.values();
        for(TankType action : tankTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/traitementStationType")
    public List<Types> getTraitementStationType(){
        List<Types> types = new ArrayList();
        TraitementStationType[] traitementStationTypes =  TraitementStationType.values();
        for(TraitementStationType action : traitementStationTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/waterIntakeType")
    public List<Types> getWaterIntakeType(){
        List<Types> types = new ArrayList();
        WaterIntakeType[] waterIntakeTypes =  WaterIntakeType.values();
        for(WaterIntakeType action : waterIntakeTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/forms")
    public List<Types> getForms(){
        List<Types> types = new ArrayList();
        OuvrageFormType[] ouvrageFormTypes =  OuvrageFormType.values();
        for(OuvrageFormType action : ouvrageFormTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }

    @GetMapping(value = "/enum/process")
    public List<Types> getProcess(){
        List<Types> types = new ArrayList();
        ProcessType[] processTypes =  ProcessType.values();
        for(ProcessType action : processTypes){
            types.add(new Types(action.name(),action.getValue()));
        }
        return  types;
    }


}
