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


    @PostMapping(value = "/composants/security/{code}")
    public ComponentResponseDto createSecurity(@RequestBody SecurityAddDto securityAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createSecurity(securityAddDto,code);
    }

    @PostMapping(value = "/composants/priseEau/{code}")
    public ComponentResponseDto createWaterIntake(@RequestBody WaterIntakeAddDto waterIntakeAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createWaterIntake(waterIntakeAddDto,code);
    }

    @PostMapping(value = "/composants/equipementStationTraitement/{code}")
    public ComponentResponseDto createTraitementStationEquipement(@RequestBody TraitementStationEquipementAddDto traitementStationEquipementAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createTraitementStationEquipement(traitementStationEquipementAddDto,code);
    }

    @PostMapping(value = "/composants/kitMembrane/{code}")
    public ComponentResponseDto createMembraneKit(@RequestBody MembraneKitAddDto membraneKitAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createMembraneKit(membraneKitAddDto,code);
    }

    @PostMapping(value = "/composants/stationPhp/{code}")
    public ComponentResponseDto createPhpStation(@RequestBody PhpStationAddDto phpStationAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createPhpStation(phpStationAddDto,code);
    }

    @PostMapping(value = "/composants/localStockage/{code}")
    public ComponentResponseDto createProductStorage(@RequestBody ProductStorageAddDto productStorageAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createProductStorage(productStorageAddDto,code);
    }

    @PostMapping(value = "/composants/batimentElectrique/{code}")
    public ComponentResponseDto createElectricBuilding(@RequestBody ElectricBuildingAddDto electricBuildingAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createElectricBuilding(electricBuildingAddDto,code);
    }

    @PostMapping(value = "/composants/groupeElectrogene/{code}")
    public ComponentResponseDto createGenerator(@RequestBody GeneratorAddDto generatorAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createGenerator(generatorAddDto,code);
    }

    @PostMapping(value = "/composants/postChimique/{code}")
    public ComponentResponseDto createChemicalPosts(@RequestBody ChemicalPostsAddDto chemicalPostsAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createChemicalPosts(chemicalPostsAddDto,code);
    }

    @PostMapping(value = "/composants/postTransformationElectrique/{code}")
    public ComponentResponseDto createTransformationStation(@RequestBody TransformationStationAddDto transformationStationAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createTransformationStation(transformationStationAddDto,code);
    }

    @PostMapping(value = "/composants/groupeElectroPompePompe/{code}")
    public ComponentResponseDto createElectroGroupPumpAddDto(@RequestBody ElectroGroupPumpAddDto electroGroupPumpAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createElectroGroupPumpAddDto(electroGroupPumpAddDto,code);
    }

    @PostMapping(value = "/composants/groupeElectroPompeMoteur/{code}")
    public ComponentResponseDto createElectroGroupMotor(@RequestBody ElectroGroupMotorAddDto electroGroupMotorAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createElectroGroupMotor(electroGroupMotorAddDto,code);
    }

    @PostMapping(value = "/composants/armoireElectrique/{code}")
    public ComponentResponseDto createElectricalCabinet(@RequestBody ElectricalCabinetAddDto electricalCabinetAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createElectricalCabinet(electricalCabinetAddDto,code);
    }

    @PostMapping(value = "/composants/antiBelier/{code}")
    public ComponentResponseDto createAntiRam(@RequestBody AntiRamAddDto antiRamAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createAntiRam(antiRamAddDto,code);
    }

    @PostMapping(value = "/composants/soupapeDecharge/{code}")
    public ComponentResponseDto createReliefValve(@RequestBody ReliefValveAddDto reliefValveAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createReliefValve(reliefValveAddDto,code);
    }

    @PostMapping(value = "/composants/equipementHydroMeca/{code}")
    public ComponentResponseDto createHedromecaEquipment(@RequestBody HedromecaEquipmentAddDto hedromecaEquipmentAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createHedromecaEquipment(hedromecaEquipmentAddDto,code);
    }

    @PostMapping(value = "/composants/postChloration/{code}")
    public ComponentResponseDto createChlorationPost(@RequestBody ChlorationPostAddDto chlorationPostAddDto,@PathVariable(value="code") String code) {
        return createComposantQuery.createChlorationPost(chlorationPostAddDto,code);
    }

}
