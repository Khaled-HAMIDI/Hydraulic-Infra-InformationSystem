package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GetComposantByOuvrageMapper {

   ComponentResponseDto componentToComponentResponse(Component component);

   List<ComponentResponseDto> componentToComponentResponse(List<Component> component);


   @Mappings({
           @Mapping(source = "entryBox",target = "guerites"),
           @Mapping(source = "nbAgents",target = "agents"),
           @Mapping(source = "weaponry",target = "armement"),
           @Mapping(source = "remoteMonitoring",target = "telsurveillance"),
           @Mapping(source = "access",target = "state")
   })
   SecurityAddDto securityToSecurityAdd(Security security);


   @Mappings({
           @Mapping(source = "brand",target = "marque"),
           @Mapping(source = "compressor",target = "compresseur"),
           @Mapping(source = "servicePressure",target = "presseionService"),
           @Mapping(source = "testPressure",target = "presseionEpreuve"),
           @Mapping(source = "inflationPressure",target = "presseionRegonflage")
   })
   AntiRamAddDto antiRamToAntiRamAdd(AntiRam antiRam);


   @Mappings({
           @Mapping(source = "implantaionPlace",target = "lieuImplantation"),
           @Mapping(source = "injectionPoint",target = "pointInjectPompe"),
           @Mapping(source = "injection",target = "dosagePompe"),
           @Mapping(source = "postNumber",target = "number"),
           @Mapping(source = "debit",target = "debitPompe"),
           @Mapping(source = "hmt",target = "hmtPompe"),
           @Mapping(source = "power",target = "puissancePompe"),
           @Mapping(source = "pumpNumber",target = "nombrePompe"),
           @Mapping(source = "enabled",target = "fonctionnementPompe"),
           @Mapping(source = "state",target = "statePompe"),
           @Mapping(source = "pumpType",target = "typePompe"),
           @Mapping(source = "mode",target = "modePompe")
   })
   ChemicalPostsAddDto chemicalPostsToChemicalPostsAdd(ChemicalPosts chemicalPosts);

   List<ChemicalPostsAddDto> chemicalPostsToChemicalPostsAdd(List<ChemicalPosts> chemicalPosts);


   @Mappings({
           @Mapping(source = "dosage",target = "dosagePompe"),
           @Mapping(source = "injectionPoint",target = "pointInjectPompe"),
           @Mapping(source = "pumpType",target = "typePompe"),
           @Mapping(source = "debit",target = "debitPompe"),
           @Mapping(source = "hmt",target = "hmtPompe"),
           @Mapping(source = "power",target = "puissancePompe"),
           @Mapping(source = "pumpNumber",target = "nombrePompe"),
           @Mapping(source = "enabled",target = "fonctionnementPompe"),
           @Mapping(source = "state",target = "statePompe")
   })
   ChlorationPostAddDto chlorationPostToChlorationPostAdd(ChlorationPost chlorationPost);


   @Mappings({
           @Mapping(source = "brand",target = "marque"),
           @Mapping(source = "power",target = "puissance")
   })
   ElectricalCabinetAddDto electricalCabinetToElectricalCabinetAdd(ElectricalCabinet electricalCabinet);


   ElectricBuildingAddDto electricBuildingToElectricBuildingAdd(ElectricBuilding electricBuilding);


   @Mappings({
           @Mapping(source = "brand",target = "marque"),
           @Mapping(source = "power",target = "puissance"),
           @Mapping(source = "mode",target = "modeDemarrage"),
           @Mapping(source = "date",target = "operatingDate"),
           @Mapping(source = "functionningNumber",target = "nbService"),
           @Mapping(source = "secoursNumber",target = "nbSecours"),
           @Mapping(source = "alimentationTension",target = "tensionAlimentation"),
           @Mapping(source = "nominaleIntensite",target = "intensite")
   })
   ElectroGroupMotorAddDto electroGroupMotorToElectroGroupMotorAdd(ElectroGroupMotor electroGroupMotor);


   @Mappings({
           @Mapping(source = "brand",target = "marque"),
           @Mapping(source = "date",target = "operatingDate"),
           @Mapping(source = "functionningNumber",target = "nbService"),
           @Mapping(source = "secoursNumber",target = "nbSecours")
   })
   ElectroGroupPumpAddDto electroGroupPumpToElectroGroupPumpAdd(ElectroGroupPump electroGroupPump);


   @Mappings({
           @Mapping(source = "storageTank",target = "cuve"),
           @Mapping(source = "power",target = "puissance")
   })
   GeneratorAddDto generatorToGeneratorAdd(Generator generator);


   @Mappings({
           @Mapping(source = "observation",target = "lieuImplantation"),
           @Mapping(source = "materials",target = "materiaux")
   })
   HedromecaEquipmentAddDto hedromecaEquipmentToHedromecaEquipmentAdd(HedromecaEquipment hedromecaEquipment);

   List<HedromecaEquipmentAddDto> hedromecaEquipmentToHedromecaEquipmentAdd(List<HedromecaEquipment> hedromecaEquipment);

   LocalBlockAddDto localBlockToLocalBlockAdd(LocalBlock localBlock);

   @Mappings({
           @Mapping(source = "characteristic",target = "caracteristique"),
           @Mapping(source = "number",target = "nombre")
   })
   MembraneKitAddDto membraneKitToMembraneKitAdd(MembraneKit membraneKit);



   @Mappings({
           @Mapping(source = "power",target = "puissance"),
           @Mapping(source = "number",target = "nombre")
   })
   PhpStationAddDto phpStationToPhpStationAdd(PhpStation phpStation);

   ProductStorageAddDto productStorageToProductStorageAdd(ProductStorage productStorage);

   @Mappings({
           @Mapping(source = "brand",target = "marque"),
           @Mapping(source = "servicePressure",target = "presseionService"),
           @Mapping(source = "etancheitePressure",target = "presseionEtanchiete"),
           @Mapping(source = "taragePressure",target = "presseionTarage")
   })
   ReliefValveAddDto reliefValveToReliefValveAdd(ReliefValve reliefValve);

   List<TraitementStationEquipementAddDto> traitementStationEquipementToTraitementStationEquipementAdd(List<TraitementStationEquipement> traitementStationEquipement);


   @Mappings({
           @Mapping(source = "brand",target = "marque"),
           @Mapping(source = "power",target = "puissance"),
           @Mapping(source = "up_us",target = "up"),
           @Mapping(source = "ip_is",target = "is"),
           @Mapping(source = "coupling",target = "couplage"),
           @Mapping(source = "oilNature",target = "natureHuile"),
           @Mapping(source = "abriNature",target = "natureAbri"),
           @Mapping(source = "tcomptage",target = "typeComptage")
   })
   TransformationStationAddDto transformationStationToTransformationStationAdd(TransformationStation transformationStation);

   WaterIntakeAddDto waterIntakeToWaterIntakeAdd(WaterIntake waterIntake);

}
