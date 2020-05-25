package dz.ade.pfe.service.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.port.in.ouvrage.createcomposant.CreateComposantCommand;
import dz.ade.pfe.port.out.ouvrage.createcomposant.SaveComposant;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CreateComposantService implements CreateComposantCommand {
    private final SaveComposant saveComposant;
    private final CreateComposantMapper createComposantMapper;

    //@Transactional
    @Override
    public ComponentResponseDto createSecurity(SecurityAddDto security,String code) {
        Security toSave = createComposantMapper.securityAddToSecurity(security);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveSecurity(toSave,code));
    }

    @Override
    public ComponentResponseDto createWaterIntake(WaterIntakeAddDto waterIntakeAddDto,String code) {
        WaterIntake toSave = createComposantMapper.waterIntakeAddToWaterIntake(waterIntakeAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveWaterIntake(toSave,code));
    }

    @Override
    public ComponentResponseDto createTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto,String code) {
        TraitementStationEquipement toSave = createComposantMapper.traitementStationEquipementAddToTraitementStationEquipement(traitementStationEquipementAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveTraitementStationEquipement(toSave,code));
    }

    @Override
    public ComponentResponseDto createMembraneKit(MembraneKitAddDto membraneKitAddDto,String code) {
        MembraneKit toSave = createComposantMapper.membraneKitAddToMembraneKit(membraneKitAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveMembraneKit(toSave,code));
    }

    @Override
    public ComponentResponseDto createPhpStation(PhpStationAddDto phpStationAddDto,String code) {
        PhpStation toSave = createComposantMapper.phpStationAddToPhpStation(phpStationAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.savePhpStation(toSave,code));
    }

    @Override
    public ComponentResponseDto createProductStorage(ProductStorageAddDto productStorageAddDto,String code) {
        ProductStorage toSave = createComposantMapper.productStorageAddToProductStorage(productStorageAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveProductStorage(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto,String code) {
        ElectricBuilding toSave = createComposantMapper.electricBuildingAddToElectricBuilding(electricBuildingAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveElectricBuilding(toSave,code));
    }

    @Override
    public ComponentResponseDto createGenerator(GeneratorAddDto generatorAddDto,String code) {
        Generator toSave = createComposantMapper.generatorAddToGenerator(generatorAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveGenerator(toSave,code));
    }

    @Override
    public ComponentResponseDto createChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto,String code) {
        ChemicalPosts toSave = createComposantMapper.chemicalPostsAddToChemicalPosts(chemicalPostsAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveChemicalPosts(toSave,code));
    }

    @Override
    public ComponentResponseDto createTransformationStation(TransformationStationAddDto transformationStationAddDto,String code) {
        TransformationStation toSave = createComposantMapper.transformationStationAddToTransformationStation(transformationStationAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveTransformationStation(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectroGroupPumpAddDto(ElectroGroupPumpAddDto electroGroupPumpAddDto,String code) {
        ElectroGroupPump toSave = createComposantMapper.electroGroupPumpAddToElectroGroupPump(electroGroupPumpAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveElectroGroupPump(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto,String code) {
        ElectroGroupMotor toSave = createComposantMapper.electroGroupMotorAddToElectroGroupMotor(electroGroupMotorAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveElectroGroupMotor(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto,String code) {
        ElectricalCabinet toSave = createComposantMapper.electricalCabinetAddToElectricalCabinet(electricalCabinetAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveElectricalCabinet(toSave,code));
    }

    @Override
    public ComponentResponseDto createAntiRam(AntiRamAddDto antiRamAddDto,String code) {
        AntiRam toSave = createComposantMapper.antiRamAddToAntiRam(antiRamAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveAntiRam(toSave,code));
    }

    @Override
    public ComponentResponseDto createReliefValve(ReliefValveAddDto reliefValveAddDto,String code) {
        ReliefValve toSave = createComposantMapper.reliefValveAddToReliefValve(reliefValveAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveReliefValve(toSave,code));
    }

    @Override
    public ComponentResponseDto createHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto,String code) {
        HedromecaEquipment toSave = createComposantMapper.hedromecaEquipmentAddToHedromecaEquipment(hedromecaEquipmentAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveHedromecaEquipment(toSave,code));
    }

    @Override
    public ComponentResponseDto createChlorationPost(ChlorationPostAddDto chlorationPostAddDto,String code) {
        ChlorationPost toSave = createComposantMapper.chlorationPostAddToChlorationPost(chlorationPostAddDto);
        return createComposantMapper.componentToComponentResponse(saveComposant.saveChlorationPost(toSave,code));
    }

}
