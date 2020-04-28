package dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;

import java.util.List;

public interface GetComposantByOuvrageQuery {

    SecurityAddDto  loadSecurity(String code);

    AntiRamAddDto  loadAntiRam(String code);

    ChlorationPostAddDto  loadChlorationPost(String code);

    ElectricalCabinetAddDto  loadElectricalCabinet(String code);

    ElectricBuildingAddDto  loadElectricBuilding(String code);

    ElectroGroupMotorAddDto  loadElectroGroupMotor(String code);

    ElectroGroupPumpAddDto  loadElectroGroupPump(String code);

    GeneratorAddDto  loadGenerator(String code);

    MembraneKitAddDto  loadMembraneKit(String code);

    PhpStationAddDto  loadPhpStation(String code);

    ProductStorageAddDto  loadProductStorage(String code);

    ReliefValveAddDto  loadReliefValve(String code);

    TransformationStationAddDto  loadTransformationStation(String code);

    WaterIntakeAddDto  loadWaterIntake(String code);
    List<TraitementStationEquipementAddDto>  loadTraitementStationEquipement(String code);

    List<ChemicalPostsAddDto>  loadChemicalPosts(String code);

    List<HedromecaEquipmentAddDto>  loadHedromecaEquipment(String code);
}

