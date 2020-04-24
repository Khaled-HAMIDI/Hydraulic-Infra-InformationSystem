package dz.ade.pfe.port.in.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;


public interface CreateComposantQuery {

    Security createSecurity(SecurityAddDto ouvrageAddDto,String code);

    WaterIntake createWaterIntake(WaterIntakeAddDto waterIntakeAddDto,String code);

    TraitementStationEquipement createTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto,String code);

    MembraneKit createMembraneKit(MembraneKitAddDto membraneKitAddDto,String code);

    PhpStation createPhpStation(PhpStationAddDto phpStationAddDto,String code);

    ProductStorage createProductStorage(ProductStorageAddDto productStorageAddDto,String code);

    ElectricBuilding createElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto,String code);

    Generator createGenerator(GeneratorAddDto generatorAddDto,String code);

    ChemicalPosts createChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto,String code);

    TransformationStation createTransformationStation(TransformationStationAddDto transformationStationAddDto,String code);

    ElectroGroupPump createElectroGroupPumpAddDto(ElectroGroupPumpAddDto electroGroupPumpAddDto,String code);

    ElectroGroupMotor createElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto,String code);

    ElectricalCabinet createElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto,String code);

    AntiRam createAntiRam(AntiRamAddDto antiRamAddDto,String code);

    ReliefValve createReliefValve(ReliefValveAddDto reliefValveAddDto,String code);

    HedromecaEquipment createHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto,String code);

    ChlorationPost createChlorationPost(ChlorationPostAddDto chlorationPostAddDto,String code);
}
