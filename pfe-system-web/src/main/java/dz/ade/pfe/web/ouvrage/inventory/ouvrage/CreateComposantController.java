package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.port.in.ouvrage.createcomposant.CreateComposantQuery;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api")
@Api(value = "composants", description = "Operations on composants")
@Component
@RequiredArgsConstructor
public class CreateComposantController {

    private final CreateComposantQuery createComposantQuery;


    @PostMapping(value = "/composants/security")
    public Security createSecurity(@RequestBody SecurityAddDto securityAddDto) {
        return createComposantQuery.createSecurity(securityAddDto);
    }

    @PostMapping(value = "/composants/priseEau")
    public WaterIntake createWaterIntake(@RequestBody WaterIntakeAddDto waterIntakeAddDto) {
        return createComposantQuery.createWaterIntake(waterIntakeAddDto);
    }

    @PostMapping(value = "/composants/equipementStationTraitement")
    public TraitementStationEquipement createTraitementStationEquipement(@RequestBody TraitementStationEquipementAddDto traitementStationEquipementAddDto) {
        return createComposantQuery.createTraitementStationEquipement(traitementStationEquipementAddDto);
    }

    @PostMapping(value = "/composants/kitMembrane")
    public MembraneKit createMembraneKit(@RequestBody MembraneKitAddDto membraneKitAddDto) {
        return createComposantQuery.createMembraneKit(membraneKitAddDto);
    }

    @PostMapping(value = "/composants/stationPhp")
    public PhpStation createPhpStation(@RequestBody PhpStationAddDto phpStationAddDto) {
        return createComposantQuery.createPhpStation(phpStationAddDto);
    }

    @PostMapping(value = "/composants/localStockage")
    public ProductStorage createProductStorage(@RequestBody ProductStorageAddDto productStorageAddDto) {
        return createComposantQuery.createProductStorage(productStorageAddDto);
    }

    @PostMapping(value = "/composants/batimentElectrique")
    public ElectricBuilding createElectricBuilding(@RequestBody ElectricBuildingAddDto electricBuildingAddDto) {
        return createComposantQuery.createElectricBuilding(electricBuildingAddDto);
    }

    @PostMapping(value = "/composants/groupeElectrogene")
    public Generator createGenerator(@RequestBody GeneratorAddDto generatorAddDto) {
        return createComposantQuery.createGenerator(generatorAddDto);
    }

    @PostMapping(value = "/composants/postChimique")
    public ChemicalPosts createChemicalPosts(@RequestBody ChemicalPostsAddDto chemicalPostsAddDto) {
        return createComposantQuery.createChemicalPosts(chemicalPostsAddDto);
    }

    @PostMapping(value = "/composants/postTransformationElectrique")
    public TransformationStation createTransformationStation(@RequestBody TransformationStationAddDto transformationStationAddDto) {
        return createComposantQuery.createTransformationStation(transformationStationAddDto);
    }

    @PostMapping(value = "/composants/groupeElectroPompePompe")
    public ElectroGroupPump createElectroGroupPumpAddDto(@RequestBody ElectroGroupPumpAddDto electroGroupPumpAddDto) {
        return createComposantQuery.createElectroGroupPumpAddDto(electroGroupPumpAddDto);
    }

    @PostMapping(value = "/composants/groupeElectroPompeMoteur")
    public ElectroGroupMotor createElectroGroupMotor(@RequestBody ElectroGroupMotorAddDto electroGroupMotorAddDto) {
        return createComposantQuery.createElectroGroupMotor(electroGroupMotorAddDto);
    }

    @PostMapping(value = "/composants/armoireElectrique")
    public ElectricalCabinet createElectricalCabinet(@RequestBody ElectricalCabinetAddDto electricalCabinetAddDto) {
        return createComposantQuery.createElectricalCabinet(electricalCabinetAddDto);
    }

    @PostMapping(value = "/composants/antiBelier")
    public AntiRam createAntiRam(@RequestBody AntiRamAddDto antiRamAddDto) {
        return createComposantQuery.createAntiRam(antiRamAddDto);
    }

    @PostMapping(value = "/composants/soupapaeDecharge")
    public ReliefValve createReliefValve(@RequestBody ReliefValveAddDto reliefValveAddDto) {
        return createComposantQuery.createReliefValve(reliefValveAddDto);
    }

    @PostMapping(value = "/composants/equipementHydroMeca")
    public HedromecaEquipment createHedromecaEquipment(@RequestBody HedromecaEquipmentAddDto hedromecaEquipmentAddDto) {
        return createComposantQuery.createHedromecaEquipment(hedromecaEquipmentAddDto);
    }

    @PostMapping(value = "/composants/postChloration")
    public ChlorationPost createChlorationPost(@RequestBody ChlorationPostAddDto chlorationPostAddDto) {
        return createComposantQuery.createChlorationPost(chlorationPostAddDto);
    }

}
