package dz.ade.pfe.web.ouvrage.inventory.ouvrage;


import dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage.GetComposantByOuvrageQuery;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "composant", description = "Obtenir la liste des composants d'un ouvrage")
@org.springframework.stereotype.Component
@RequiredArgsConstructor

public class GetComposantByOuvrageController {
    private final GetComposantByOuvrageQuery getComposantByOuvrage;

    @GetMapping(value = "/ouvrage/{code}/composants/security")
    public SecurityAddDto getSecurity(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadSecurity(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/priseEau")
    public WaterIntakeAddDto getWaterIntake(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadWaterIntake(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/equipementStationTraitement")
    public List<TraitementStationEquipementAddDto> getTraitementStationEquipement(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadTraitementStationEquipement(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/kitMembrane")
    public MembraneKitAddDto getMembraneKit(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadMembraneKit(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/stationPhp")
    public PhpStationAddDto getPhpStation(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadPhpStation(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/localStockage")
    public ProductStorageAddDto getProductStorage(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadProductStorage(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/batimentElectrique")
    public ElectricBuildingAddDto getElectricBuilding(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadElectricBuilding(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/groupeElectrogene")
    public GeneratorAddDto getGenerator(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadGenerator(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/postChimique")
    public List<ChemicalPostsAddDto> getChemicalPosts(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadChemicalPosts(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/postTransformationElectrique")
    public TransformationStationAddDto getTransformationStation(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadTransformationStation(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/groupeElectroPompePompe")
    public ElectroGroupPumpAddDto getElectroGroupPump(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadElectroGroupPump(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/groupeElectroPompeMoteur")
    public ElectroGroupMotorAddDto getElectroGroupMotor(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadElectroGroupMotor(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/armoireElectrique")
    public ElectricalCabinetAddDto getElectricalCabinet(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadElectricalCabinet(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/antiBelier")
    public AntiRamAddDto getAntiRam(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadAntiRam(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/soupapeDecharge")
    public ReliefValveAddDto getReliefValve(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadReliefValve(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/equipementHydroMeca")
    public List<HedromecaEquipmentAddDto> getHedromecaEquipment(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadHedromecaEquipment(code);
    }

    @GetMapping(value = "/ouvrage/{code}/composants/postChloration")
    public ChlorationPostAddDto getChlorationPost(@PathVariable(value = "code") String code) {
        return getComposantByOuvrage.loadChlorationPost(code);
    }
}
