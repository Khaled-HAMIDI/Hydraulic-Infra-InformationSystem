package dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.*;

import java.util.List;

public interface LoadComposantByOuvrage {
    
     Security loadSecurity(String code);
        
     AntiRam loadAntiRam(String code);
        
     ChlorationPost loadChlorationPost(String code);
    
     ElectricalCabinet loadElectricalCabinet(String code);
    
     ElectricBuilding loadElectricBuilding(String code);
    
     ElectroGroupMotor loadElectroGroupMotor(String code);
    
     ElectroGroupPump loadElectroGroupPump(String code);
    
     Generator loadGenerator(String code);
    
     MembraneKit loadMembraneKit(String code);
    
     PhpStation loadPhpStation(String code);
    
     ProductStorage loadProductStorage(String code);
    
     ReliefValve loadReliefValve(String code);
        
     TransformationStation loadTransformationStation(String code);
    
     WaterIntake loadWaterIntake(String code);
    
     List<TraitementStationEquipement> loadTraitementStationEquipement(String code);
        
     List<ChemicalPosts> loadChemicalPosts(String code);
    
     List<HedromecaEquipment> loadHedromecaEquipment(String code);
}
