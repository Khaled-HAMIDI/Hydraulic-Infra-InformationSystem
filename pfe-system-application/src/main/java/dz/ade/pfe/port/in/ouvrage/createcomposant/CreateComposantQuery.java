package dz.ade.pfe.port.in.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;


public interface CreateComposantQuery {

    Security createSecurity(SecurityAddDto ouvrageAddDto);

    WaterIntake createWaterIntake(WaterIntakeAddDto waterIntakeAddDto);

    TraitementStationEquipement createTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto);

    MembraneKit createMembraneKit(MembraneKitAddDto membraneKitAddDto);

    PhpStation createPhpStation(PhpStationAddDto phpStationAddDto);

    ProductStorage createProductStorage(ProductStorageAddDto productStorageAddDto);

    ElectricBuilding createElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto);

    Generator createGenerator(GeneratorAddDto generatorAddDto);

    ChemicalPosts createChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto);

    TransformationStation createTransformationStation(TransformationStationAddDto transformationStationAddDto);

    ElectroGroupPump createElectroGroupPumpAddDto(ElectroGroupPumpAddDto electroGroupPumpAddDto);

    ElectroGroupMotor createElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto);

    ElectricalCabinet createElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto);

    AntiRam createAntiRam(AntiRamAddDto antiRamAddDto);

    ReliefValve createReliefValve(ReliefValveAddDto reliefValveAddDto);

    HedromecaEquipment createHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto);

    ChlorationPost createChlorationPost(ChlorationPostAddDto chlorationPostAddDto);
}
