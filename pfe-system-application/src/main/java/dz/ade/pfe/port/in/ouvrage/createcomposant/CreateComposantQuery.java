package dz.ade.pfe.port.in.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;


public interface CreateComposantQuery {

    ComponentResponseDto createSecurity(SecurityAddDto ouvrageAddDto,String code);

    ComponentResponseDto createWaterIntake(WaterIntakeAddDto waterIntakeAddDto,String code);

    ComponentResponseDto createTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto,String code);

    ComponentResponseDto createMembraneKit(MembraneKitAddDto membraneKitAddDto,String code);

    ComponentResponseDto createPhpStation(PhpStationAddDto phpStationAddDto,String code);

    ComponentResponseDto createProductStorage(ProductStorageAddDto productStorageAddDto,String code);

    ComponentResponseDto createElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto,String code);

    ComponentResponseDto createGenerator(GeneratorAddDto generatorAddDto,String code);

    ComponentResponseDto createChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto,String code);

    ComponentResponseDto createTransformationStation(TransformationStationAddDto transformationStationAddDto,String code);

    ComponentResponseDto createElectroGroupPumpAddDto(ElectroGroupPumpAddDto electroGroupPumpAddDto,String code);

    ComponentResponseDto createElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto,String code);

    ComponentResponseDto createElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto,String code);

    ComponentResponseDto createAntiRam(AntiRamAddDto antiRamAddDto,String code);

    ComponentResponseDto createReliefValve(ReliefValveAddDto reliefValveAddDto,String code);

    ComponentResponseDto createHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto,String code);

    ComponentResponseDto createChlorationPost(ChlorationPostAddDto chlorationPostAddDto,String code);
}
