package dz.ade.pfe.port.out.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;

public interface SaveComposant {

    Security saveSecurity(Security security);

    AntiRam saveAntiRam(AntiRam antiRam);

    ChemicalPosts saveChemicalPosts(ChemicalPosts chemicalPosts);

    ChlorationPost saveChlorationPost(ChlorationPost chlorationPost);

    ElectricalCabinet saveElectricalCabinet(ElectricalCabinet electricalCabinet);

    ElectricBuilding saveElectricBuilding(ElectricBuilding electricBuilding);

    ElectroGroupMotor saveElectroGroupMotor(ElectroGroupMotor electroGroupMotor);

    ElectroGroupPump saveElectroGroupPump(ElectroGroupPump electroGroupPump);

    Generator saveGenerator(Generator generator);

    HedromecaEquipment saveHedromecaEquipment(HedromecaEquipment hedromecaEquipment);

    LocalBlock saveLocalBlock(LocalBlock localBlock);

    MembraneKit saveMembraneKit(MembraneKit membraneKit);

    PhpStation savePhpStation(PhpStation phpStation);

    ProductStorage saveProductStorage(ProductStorage productStorage);

    ReliefValve saveReliefValve(ReliefValve reliefValve);

    TransformationStation saveTransformationStation(TransformationStation transformationStation);

    TraitementStationEquipement saveTraitementStationEquipement(TraitementStationEquipement traitementStationEquipement);

    WaterIntake saveWaterIntake(WaterIntake waterIntake);
}
