package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage.GetComposantByOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage.LoadComposantByOuvrage;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetComposantByOuvrage implements GetComposantByOuvrageQuery{

    private final LoadComposantByOuvrage loadComposantByOuvrage;
    private final GetComposantByOuvrageMapper getComposantByOuvrageMapper;


    @Override
    public SecurityAddDto loadSecurity(String code) {
        return getComposantByOuvrageMapper.securityToSecurityAdd(loadComposantByOuvrage.loadSecurity(code));
    }

    @Override
    public AntiRamAddDto loadAntiRam(String code) {
        return getComposantByOuvrageMapper.antiRamToAntiRamAdd(loadComposantByOuvrage.loadAntiRam(code));
    }

    @Override
    public ChlorationPostAddDto loadChlorationPost(String code) {

        return getComposantByOuvrageMapper.chlorationPostToChlorationPostAdd(loadComposantByOuvrage.loadChlorationPost(code));
    }

    @Override
    public ElectricalCabinetAddDto loadElectricalCabinet(String code) {

        return getComposantByOuvrageMapper.electricalCabinetToElectricalCabinetAdd(loadComposantByOuvrage.loadElectricalCabinet(code));
    }

    @Override
    public ElectricBuildingAddDto loadElectricBuilding(String code) {

        return getComposantByOuvrageMapper.electricBuildingToElectricBuildingAdd(loadComposantByOuvrage.loadElectricBuilding(code));

    }

    @Override
    public ElectroGroupMotorAddDto loadElectroGroupMotor(String code) {

        return getComposantByOuvrageMapper.electroGroupMotorToElectroGroupMotorAdd(loadComposantByOuvrage.loadElectroGroupMotor(code));
    }

    @Override
    public ElectroGroupPumpAddDto loadElectroGroupPump(String code) {

        return getComposantByOuvrageMapper.electroGroupPumpToElectroGroupPumpAdd(loadComposantByOuvrage.loadElectroGroupPump(code));
    }

    @Override
    public GeneratorAddDto loadGenerator(String code) {

        return getComposantByOuvrageMapper.generatorToGeneratorAdd(loadComposantByOuvrage.loadGenerator(code));
    }

    @Override
    public MembraneKitAddDto loadMembraneKit(String code) {

        return getComposantByOuvrageMapper.membraneKitToMembraneKitAdd(loadComposantByOuvrage.loadMembraneKit(code));
    }

    @Override
    public PhpStationAddDto loadPhpStation(String code) {

        return getComposantByOuvrageMapper.phpStationToPhpStationAdd(loadComposantByOuvrage.loadPhpStation(code));
    }

    @Override
    public ProductStorageAddDto loadProductStorage(String code) {

        return getComposantByOuvrageMapper.productStorageToProductStorageAdd(loadComposantByOuvrage.loadProductStorage(code));
    }

    @Override
    public ReliefValveAddDto loadReliefValve(String code) {

        return getComposantByOuvrageMapper.reliefValveToReliefValveAdd(loadComposantByOuvrage.loadReliefValve(code));
    }

    @Override
    public TransformationStationAddDto loadTransformationStation(String code) {

        return getComposantByOuvrageMapper.transformationStationToTransformationStationAdd(loadComposantByOuvrage.loadTransformationStation(code));
    }

    @Override
    public WaterIntakeAddDto loadWaterIntake(String code) {

        return getComposantByOuvrageMapper.waterIntakeToWaterIntakeAdd(loadComposantByOuvrage.loadWaterIntake(code));
    }

    @Override
    public List<TraitementStationEquipementAddDto> loadTraitementStationEquipement(String code) {

        return getComposantByOuvrageMapper.traitementStationEquipementToTraitementStationEquipementAdd(loadComposantByOuvrage.loadTraitementStationEquipement(code));
    }

    @Override
    public List<ChemicalPostsAddDto> loadChemicalPosts(String code) {

        return getComposantByOuvrageMapper.chemicalPostsToChemicalPostsAdd(loadComposantByOuvrage.loadChemicalPosts(code));
    }

    @Override
    public List<HedromecaEquipmentAddDto> loadHedromecaEquipment(String code) {

        return getComposantByOuvrageMapper.hedromecaEquipmentToHedromecaEquipmentAdd(loadComposantByOuvrage.loadHedromecaEquipment(code));
    }
}
