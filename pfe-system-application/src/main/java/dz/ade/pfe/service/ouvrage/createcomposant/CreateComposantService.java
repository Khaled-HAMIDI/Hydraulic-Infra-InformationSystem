package dz.ade.pfe.service.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.port.in.ouvrage.createcomposant.CreateComposantQuery;
import dz.ade.pfe.port.out.ouvrage.createcomposant.SaveComposant;
import dz.ade.pfe.service.ouvrage.ComposantMapper;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CreateComposantService implements CreateComposantQuery {
    private final SaveComposant saveComposant;
    private final ComposantMapper composantMapper;

    //@Transactional
    @Override
    public ComponentResponseDto createSecurity(SecurityAddDto security,String code) {
        Security toSave = composantMapper.securityAddToSecurity(security);
        return composantMapper.componentToComponentResponse(saveComposant.saveSecurity(toSave,code));
    }

    @Override
    public ComponentResponseDto createWaterIntake(WaterIntakeAddDto waterIntakeAddDto,String code) {
        WaterIntake toSave = composantMapper.waterIntakeAddToWaterIntake(waterIntakeAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveWaterIntake(toSave,code));
    }

    @Override
    public ComponentResponseDto createTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto,String code) {
        TraitementStationEquipement toSave = composantMapper.traitementStationEquipementAddToTraitementStationEquipement(traitementStationEquipementAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveTraitementStationEquipement(toSave,code));
    }

    @Override
    public ComponentResponseDto createMembraneKit(MembraneKitAddDto membraneKitAddDto,String code) {
        MembraneKit toSave = composantMapper.membraneKitAddToMembraneKit(membraneKitAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveMembraneKit(toSave,code));
    }

    @Override
    public ComponentResponseDto createPhpStation(PhpStationAddDto phpStationAddDto,String code) {
        PhpStation toSave = composantMapper.phpStationAddToPhpStation(phpStationAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.savePhpStation(toSave,code));
    }

    @Override
    public ComponentResponseDto createProductStorage(ProductStorageAddDto productStorageAddDto,String code) {
        ProductStorage toSave = composantMapper.productStorageAddToProductStorage(productStorageAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveProductStorage(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto,String code) {
        ElectricBuilding toSave = composantMapper.electricBuildingAddToElectricBuilding(electricBuildingAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveElectricBuilding(toSave,code));
    }

    @Override
    public ComponentResponseDto createGenerator(GeneratorAddDto generatorAddDto,String code) {
        Generator toSave = composantMapper.generatorAddToGenerator(generatorAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveGenerator(toSave,code));
    }

    @Override
    public ComponentResponseDto createChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto,String code) {
        ChemicalPosts toSave = composantMapper.chemicalPostsAddToChemicalPosts(chemicalPostsAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveChemicalPosts(toSave,code));
    }

    @Override
    public ComponentResponseDto createTransformationStation(TransformationStationAddDto transformationStationAddDto,String code) {
        TransformationStation toSave = composantMapper.transformationStationAddToTransformationStation(transformationStationAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveTransformationStation(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectroGroupPumpAddDto(ElectroGroupPumpAddDto electroGroupPumpAddDto,String code) {
        ElectroGroupPump toSave = composantMapper.electroGroupPumpAddToElectroGroupPump(electroGroupPumpAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveElectroGroupPump(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto,String code) {
        ElectroGroupMotor toSave = composantMapper.electroGroupMotorAddToElectroGroupMotor(electroGroupMotorAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveElectroGroupMotor(toSave,code));
    }

    @Override
    public ComponentResponseDto createElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto,String code) {
        ElectricalCabinet toSave = composantMapper.electricalCabinetAddToElectricalCabinet(electricalCabinetAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveElectricalCabinet(toSave,code));
    }

    @Override
    public ComponentResponseDto createAntiRam(AntiRamAddDto antiRamAddDto,String code) {
        AntiRam toSave = composantMapper.antiRamAddToAntiRam(antiRamAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveAntiRam(toSave,code));
    }

    @Override
    public ComponentResponseDto createReliefValve(ReliefValveAddDto reliefValveAddDto,String code) {
        ReliefValve toSave = composantMapper.reliefValveAddToReliefValve(reliefValveAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveReliefValve(toSave,code));
    }

    @Override
    public ComponentResponseDto createHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto,String code) {
        HedromecaEquipment toSave = composantMapper.hedromecaEquipmentAddToHedromecaEquipment(hedromecaEquipmentAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveHedromecaEquipment(toSave,code));
    }

    @Override
    public ComponentResponseDto createChlorationPost(ChlorationPostAddDto chlorationPostAddDto,String code) {
        ChlorationPost toSave = composantMapper.chlorationPostAddToChlorationPost(chlorationPostAddDto);
        return composantMapper.componentToComponentResponse(saveComposant.saveChlorationPost(toSave,code));
    }

}
