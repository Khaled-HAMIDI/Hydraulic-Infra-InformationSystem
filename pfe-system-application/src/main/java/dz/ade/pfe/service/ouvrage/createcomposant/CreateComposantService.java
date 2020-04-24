package dz.ade.pfe.service.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.port.in.ouvrage.createcomposant.CreateComposantQuery;
import dz.ade.pfe.port.out.ouvrage.createcomposant.SaveComposant;
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
    public Security createSecurity(SecurityAddDto security,String code) {
        Security toSave = composantMapper.securityAddToSecurity(security);
        return saveComposant.saveSecurity(toSave,code);
    }

    @Override
    public WaterIntake createWaterIntake(WaterIntakeAddDto waterIntakeAddDto,String code) {
        WaterIntake toSave = composantMapper.waterIntakeAddToWaterIntake(waterIntakeAddDto);
        return saveComposant.saveWaterIntake(toSave,code);
    }

    @Override
    public TraitementStationEquipement createTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto,String code) {
        TraitementStationEquipement toSave = composantMapper.traitementStationEquipementAddToTraitementStationEquipement(traitementStationEquipementAddDto);
        return saveComposant.saveTraitementStationEquipement(toSave,code);
    }

    @Override
    public MembraneKit createMembraneKit(MembraneKitAddDto membraneKitAddDto,String code) {
        MembraneKit toSave = composantMapper.membraneKitAddToMembraneKit(membraneKitAddDto);
        return saveComposant.saveMembraneKit(toSave,code);
    }

    @Override
    public PhpStation createPhpStation(PhpStationAddDto phpStationAddDto,String code) {
        PhpStation toSave = composantMapper.phpStationAddToPhpStation(phpStationAddDto);
        return saveComposant.savePhpStation(toSave,code);
    }

    @Override
    public ProductStorage createProductStorage(ProductStorageAddDto productStorageAddDto,String code) {
        ProductStorage toSave = composantMapper.productStorageAddToProductStorage(productStorageAddDto);
        return saveComposant.saveProductStorage(toSave,code);
    }

    @Override
    public ElectricBuilding createElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto,String code) {
        ElectricBuilding toSave = composantMapper.electricBuildingAddToElectricBuilding(electricBuildingAddDto);
        return saveComposant.saveElectricBuilding(toSave,code);
    }

    @Override
    public Generator createGenerator(GeneratorAddDto generatorAddDto,String code) {
        Generator toSave = composantMapper.generatorAddToGenerator(generatorAddDto);
        return saveComposant.saveGenerator(toSave,code);
    }

    @Override
    public ChemicalPosts createChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto,String code) {
        ChemicalPosts toSave = composantMapper.chemicalPostsAddToChemicalPosts(chemicalPostsAddDto);
        return saveComposant.saveChemicalPosts(toSave,code);
    }

    @Override
    public TransformationStation createTransformationStation(TransformationStationAddDto transformationStationAddDto,String code) {
        TransformationStation toSave = composantMapper.transformationStationAddToTransformationStation(transformationStationAddDto);
        return saveComposant.saveTransformationStation(toSave,code);
    }

    @Override
    public ElectroGroupPump createElectroGroupPumpAddDto(ElectroGroupPumpAddDto electroGroupPumpAddDto,String code) {
        ElectroGroupPump toSave = composantMapper.electroGroupPumpAddToElectroGroupPump(electroGroupPumpAddDto);
        return saveComposant.saveElectroGroupPump(toSave,code);
    }

    @Override
    public ElectroGroupMotor createElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto,String code) {
        ElectroGroupMotor toSave = composantMapper.electroGroupMotorAddToElectroGroupMotor(electroGroupMotorAddDto);
        return saveComposant.saveElectroGroupMotor(toSave,code);
    }

    @Override
    public ElectricalCabinet createElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto,String code) {
        ElectricalCabinet toSave = composantMapper.electricalCabinetAddToElectricalCabinet(electricalCabinetAddDto);
        return saveComposant.saveElectricalCabinet(toSave,code);
    }

    @Override
    public AntiRam createAntiRam(AntiRamAddDto antiRamAddDto,String code) {
        AntiRam toSave = composantMapper.antiRamAddToAntiRam(antiRamAddDto);
        return saveComposant.saveAntiRam(toSave,code);
    }

    @Override
    public ReliefValve createReliefValve(ReliefValveAddDto reliefValveAddDto,String code) {
        ReliefValve toSave = composantMapper.reliefValveAddToReliefValve(reliefValveAddDto);
        return saveComposant.saveReliefValve(toSave,code);
    }

    @Override
    public HedromecaEquipment createHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto,String code) {
        HedromecaEquipment toSave = composantMapper.hedromecaEquipmentAddToHedromecaEquipment(hedromecaEquipmentAddDto);
        return saveComposant.saveHedromecaEquipment(toSave,code);
    }

    @Override
    public ChlorationPost createChlorationPost(ChlorationPostAddDto chlorationPostAddDto,String code) {
        ChlorationPost toSave = composantMapper.chlorationPostAddToChlorationPost(chlorationPostAddDto);
        return saveComposant.saveChlorationPost(toSave,code);
    }

}
