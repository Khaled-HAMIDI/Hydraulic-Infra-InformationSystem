package dz.ade.pfe.service.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.port.in.ouvrage.createcomposant.CreateComposantQuery;
import dz.ade.pfe.port.out.ouvrage.createcomposant.SaveComposant;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CreateComposantService implements CreateComposantQuery {
    private final SaveComposant saveComposant;
    private final ComposantMapper composantMapper;

    //@Transactional
    @Override
    public Security createSecurity(SecurityAddDto security) {
        Security toSave = composantMapper.securityAddToSecurity(security);
        return saveComposant.saveSecurity(toSave);
    }

    @Override
    public WaterIntake createWaterIntake(WaterIntakeAddDto waterIntakeAddDto) {
        WaterIntake toSave = composantMapper.waterIntakeAddToWaterIntake(waterIntakeAddDto);
        return saveComposant.saveWaterIntake(toSave);
    }

    @Override
    public TraitementStationEquipement createTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto) {
        TraitementStationEquipement toSave = composantMapper.traitementStationEquipementAddToTraitementStationEquipement(traitementStationEquipementAddDto);
        return saveComposant.saveTraitementStationEquipement(toSave);
    }

    @Override
    public MembraneKit createMembraneKit(MembraneKitAddDto membraneKitAddDto) {
        MembraneKit toSave = composantMapper.membraneKitAddToMembraneKit(membraneKitAddDto);
        return saveComposant.saveMembraneKit(toSave);
    }

    @Override
    public PhpStation createPhpStation(PhpStationAddDto phpStationAddDto) {
        PhpStation toSave = composantMapper.phpStationAddToPhpStation(phpStationAddDto);
        return saveComposant.savePhpStation(toSave);
    }

    @Override
    public ProductStorage createProductStorage(ProductStorageAddDto productStorageAddDto) {
        ProductStorage toSave = composantMapper.productStorageAddToProductStorage(productStorageAddDto);
        return saveComposant.saveProductStorage(toSave);
    }

    @Override
    public ElectricBuilding createElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto) {
        ElectricBuilding toSave = composantMapper.electricBuildingAddToElectricBuilding(electricBuildingAddDto);
        return saveComposant.saveElectricBuilding(toSave);
    }

    @Override
    public Generator createGenerator(GeneratorAddDto generatorAddDto) {
        Generator toSave = composantMapper.generatorAddToGenerator(generatorAddDto);
        return saveComposant.saveGenerator(toSave);
    }

    @Override
    public ChemicalPosts createChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto) {
        ChemicalPosts toSave = composantMapper.chemicalPostsAddToChemicalPosts(chemicalPostsAddDto);
        return saveComposant.saveChemicalPosts(toSave);
    }

    @Override
    public TransformationStation createTransformationStation(TransformationStationAddDto transformationStationAddDto) {
        TransformationStation toSave = composantMapper.transformationStationAddToTransformationStation(transformationStationAddDto);
        return saveComposant.saveTransformationStation(toSave);
    }

    @Override
    public ElectroGroupPump createElectroGroupPumpAddDto(ElectroGroupPumpAddDto electroGroupPumpAddDto) {
        ElectroGroupPump toSave = composantMapper.electroGroupPumpAddToElectroGroupPump(electroGroupPumpAddDto);
        return saveComposant.saveElectroGroupPump(toSave);
    }

    @Override
    public ElectroGroupMotor createElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto) {
        ElectroGroupMotor toSave = composantMapper.electroGroupMotorAddToElectroGroupMotor(electroGroupMotorAddDto);
        return saveComposant.saveElectroGroupMotor(toSave);
    }

    @Override
    public ElectricalCabinet createElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto) {
        ElectricalCabinet toSave = composantMapper.electricalCabinetAddToElectricalCabinet(electricalCabinetAddDto);
        return saveComposant.saveElectricalCabinet(toSave);
    }

    @Override
    public AntiRam createAntiRam(AntiRamAddDto antiRamAddDto) {
        AntiRam toSave = composantMapper.antiRamAddToAntiRam(antiRamAddDto);
        return saveComposant.saveAntiRam(toSave);
    }

    @Override
    public ReliefValve createReliefValve(ReliefValveAddDto reliefValveAddDto) {
        ReliefValve toSave = composantMapper.reliefValveAddToReliefValve(reliefValveAddDto);
        return saveComposant.saveReliefValve(toSave);
    }

    @Override
    public HedromecaEquipment createHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto) {
        HedromecaEquipment toSave = composantMapper.hedromecaEquipmentAddToHedromecaEquipment(hedromecaEquipmentAddDto);
        return saveComposant.saveHedromecaEquipment(toSave);
    }

    @Override
    public ChlorationPost createChlorationPost(ChlorationPostAddDto chlorationPostAddDto) {
        ChlorationPost toSave = composantMapper.chlorationPostAddToChlorationPost(chlorationPostAddDto);
        return saveComposant.saveChlorationPost(toSave);
    }

}
