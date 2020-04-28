package dz.ade.pfe.ouvrage.inventory.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.ouvrage.inventory.ouvrage.ComponentRepository;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage.LoadComposantByOuvrage;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Component
@RequiredArgsConstructor
public class GetComposantByOuvrageAdapter implements LoadComposantByOuvrage {


    private final OuvrageRepository ouvrageRepository;
    private final ComponentRepository componentRepository;

    @Override
    public Security loadSecurity(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadSecurity(ouvrage);
    }

    @Override
    public AntiRam loadAntiRam(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadAntiRam(ouvrage);
    }

    @Override
    public ChlorationPost loadChlorationPost(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadChlorationPost(ouvrage);
    }

    @Override
    public ElectricalCabinet loadElectricalCabinet(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadElectricalCabinet(ouvrage);
    }

    @Override
    public ElectricBuilding loadElectricBuilding(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadElectricBuilding(ouvrage);
    }

    @Override
    public ElectroGroupMotor loadElectroGroupMotor(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadElectroGroupMotor(ouvrage);
    }

    @Override
    public ElectroGroupPump loadElectroGroupPump(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadElectroGroupPump(ouvrage);
    }

    @Override
    public Generator loadGenerator(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadGenerator(ouvrage);
    }

    @Override
    public MembraneKit loadMembraneKit(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadMembraneKit(ouvrage);
    }

    @Override
    public PhpStation loadPhpStation(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadPhpStation(ouvrage);
    }

    @Override
    public ProductStorage loadProductStorage(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadProductStorage(ouvrage);
    }

    @Override
    public ReliefValve loadReliefValve(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadReliefValve(ouvrage);
    }

    @Override
    public TransformationStation loadTransformationStation(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadTransformationStation(ouvrage);
    }

    @Override
    public WaterIntake loadWaterIntake(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadWaterIntake(ouvrage);
    }

    @Override
    public List<TraitementStationEquipement> loadTraitementStationEquipement(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadTraitementStationEquipement(ouvrage);
    }

    @Override
    public List<ChemicalPosts> loadChemicalPosts(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadChemicalPosts(ouvrage);
    }

    @Override
    public List<HedromecaEquipment> loadHedromecaEquipment(String code){
        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return componentRepository.loadHedromecaEquipment(ouvrage);
    }
}

