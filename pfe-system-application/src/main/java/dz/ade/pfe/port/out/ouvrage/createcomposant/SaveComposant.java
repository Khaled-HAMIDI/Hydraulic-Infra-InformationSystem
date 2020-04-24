package dz.ade.pfe.port.out.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;

public interface SaveComposant {

    Security saveSecurity(Security security,String code);

    AntiRam saveAntiRam(AntiRam antiRam,String code);

    ChemicalPosts saveChemicalPosts(ChemicalPosts chemicalPosts,String code);

    ChlorationPost saveChlorationPost(ChlorationPost chlorationPost,String code);

    ElectricalCabinet saveElectricalCabinet(ElectricalCabinet electricalCabinet,String code);

    ElectricBuilding saveElectricBuilding(ElectricBuilding electricBuilding,String code);

    ElectroGroupMotor saveElectroGroupMotor(ElectroGroupMotor electroGroupMotor,String code);

    ElectroGroupPump saveElectroGroupPump(ElectroGroupPump electroGroupPump,String code);

    Generator saveGenerator(Generator generator,String code);

    HedromecaEquipment saveHedromecaEquipment(HedromecaEquipment hedromecaEquipment,String code);

    LocalBlock saveLocalBlock(LocalBlock localBlock,String code);

    MembraneKit saveMembraneKit(MembraneKit membraneKit,String code);

    PhpStation savePhpStation(PhpStation phpStation,String code);

    ProductStorage saveProductStorage(ProductStorage productStorage,String code);

    ReliefValve saveReliefValve(ReliefValve reliefValve,String code);

    TransformationStation saveTransformationStation(TransformationStation transformationStation,String code);

    TraitementStationEquipement saveTraitementStationEquipement(TraitementStationEquipement traitementStationEquipement,String code);

    WaterIntake saveWaterIntake(WaterIntake waterIntake,String code);
}
