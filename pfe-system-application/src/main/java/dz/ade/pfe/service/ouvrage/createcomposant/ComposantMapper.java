package dz.ade.pfe.service.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ComposantMapper {

   @Mappings({
           @Mapping(source = "guerites", target = "entryBox"),
           @Mapping(source = "agents", target = "nbAgents"),
           @Mapping(source = "armement", target = "weaponry"),
           @Mapping(source = "telsurveillance", target = "remoteMonitoring"),
           @Mapping(source = "state", target = "access")
   })
   Security securityAddToSecurity(SecurityAddDto securityAddDto);


   @Mappings({
           @Mapping(source = "marque", target = "brand"),
           @Mapping(source = "compresseur", target = "compressor"),
           @Mapping(source = "presseionService", target = "servicePressure"),
           @Mapping(source = "presseionEpreuve", target = "testPressure"),
           @Mapping(source = "presseionRegonflage", target = "inflationPressure")
   })
   AntiRam antiRamAddToAntiRam(AntiRamAddDto antiRamAddDto);


   @Mappings({
           @Mapping(source = "lieuImplantation", target = "implantaionPlace"),
           @Mapping(source = "pointInjectPompe", target = "injectionPoint"),
           @Mapping(source = "dosagePompe", target = "injection"),
           @Mapping(source = "number", target = "postNumber"),
           @Mapping(source = "debitPompe", target = "debit"),
           @Mapping(source = "hmtPompe", target = "hmt"),
           @Mapping(source = "puissancePompe", target = "power"),
           @Mapping(source = "nombrePompe", target = "pumpNumber"),
           @Mapping(source = "fonctionnementPompe", target = "enabled"),
           @Mapping(source = "statePompe", target = "state"),
           @Mapping(source = "typePompe", target = "pumpType"),
           @Mapping(source = "modePompe", target = "mode")
   })
   ChemicalPosts chemicalPostsAddToChemicalPosts(ChemicalPostsAddDto chemicalPostsAddDto);


   @Mappings({
           @Mapping(source = "dosagePompe", target = "dosage"),
           @Mapping(source = "pointInjectPompe", target = "injectionPoint"),
           @Mapping(source = "typePompe", target = "pumpType"),
           @Mapping(source = "debitPompe", target = "debit"),
           @Mapping(source = "hmtPompe", target = "hmt"),
           @Mapping(source = "puissancePompe", target = "power"),
           @Mapping(source = "nombrePompe", target = "pumpNumber"),
           @Mapping(source = "fonctionnementPompe", target = "enabled"),
           @Mapping(source = "statePompe", target = "state")
   })
   ChlorationPost chlorationPostAddToChlorationPost(ChlorationPostAddDto chlorationPostAddDto);


   @Mappings({
           @Mapping(source = "marque", target = "brand"),
           @Mapping(source = "puissance", target = "power")
   })
   ElectricalCabinet electricalCabinetAddToElectricalCabinet(ElectricalCabinetAddDto electricalCabinetAddDto);


   ElectricBuilding electricBuildingAddToElectricBuilding(ElectricBuildingAddDto electricBuildingAddDto);


   @Mappings({
           @Mapping(source = "marque", target = "brand"),
           @Mapping(source = "puissance", target = "power"),
           @Mapping(source = "modeDemarrage", target = "mode"),
           @Mapping(source = "operatingDate", target = "date"),
           @Mapping(source = "nbService", target = "functionningNumber"),
           @Mapping(source = "nbSecours", target = "secoursNumber"),
           @Mapping(source = "tensionAlimentation", target = "alimentationTension"),
           @Mapping(source = "intensite", target = "nominaleIntensite")
   })
   ElectroGroupMotor electroGroupMotorAddToElectroGroupMotor(ElectroGroupMotorAddDto electroGroupMotorAddDto);


   @Mappings({
           @Mapping(source = "marque", target = "brand"),
           @Mapping(source = "operatingDate", target = "date"),
           @Mapping(source = "nbService", target = "functionningNumber"),
           @Mapping(source = "nbSecours", target = "secoursNumber")
   })
   ElectroGroupPump electroGroupPumpAddToElectroGroupPump(ElectroGroupPumpAddDto electroGroupPumpAddDto);


   @Mappings({
           @Mapping(source = "cuve", target = "storageTank"),
           @Mapping(source = "puissance", target = "power")
   })
   Generator generatorAddToGenerator(GeneratorAddDto generatorAddDto);


   @Mappings({
           @Mapping(source = "lieuImplantation", target = "observation"),
           @Mapping(source = "materiaux", target = "materials")
   })
   HedromecaEquipment hedromecaEquipmentAddToHedromecaEquipment(HedromecaEquipmentAddDto hedromecaEquipmentAddDto);

   LocalBlock localBlockAddToLocalBlock(LocalBlockAddDto localBlockAddDto);

   @Mappings({
           @Mapping(source = "caracteristique", target = "characteristic"),
           @Mapping(source = "nombre", target = "number")
   })
   MembraneKit membraneKitAddToMembraneKit(MembraneKitAddDto membraneKitAddDto);



   @Mappings({
           @Mapping(source = "puissance", target = "power"),
           @Mapping(source = "nombre", target = "number")
   })
   PhpStation phpStationAddToPhpStation(PhpStationAddDto phpStationAddDto);

   ProductStorage productStorageAddToProductStorage(ProductStorageAddDto productStorageAddDto);

   @Mappings({
           @Mapping(source = "marque", target = "brand"),
           @Mapping(source = "presseionService", target = "servicePressure"),
           @Mapping(source = "presseionEtanchiete", target = "etancheitePressure"),
           @Mapping(source = "presseionTarage", target = "taragePressure")
   })
   ReliefValve reliefValveAddToReliefValve(ReliefValveAddDto reliefValveAddDto);

   TraitementStationEquipement traitementStationEquipementAddToTraitementStationEquipement(TraitementStationEquipementAddDto traitementStationEquipementAddDto);


   @Mappings({
           @Mapping(source = "marque", target = "brand"),
           @Mapping(source = "puissance", target = "power"),
           @Mapping(source = "up", target = "up_us"),
           @Mapping(source = "is", target = "ip_is"),
           @Mapping(source = "couplage", target = "coupling"),
           @Mapping(source = "natureHuile", target = "oilNature"),
           @Mapping(source = "natureAbri", target = "abriNature"),
           @Mapping(source = "typeComptage", target = "tcomptage")
   })
   TransformationStation transformationStationAddToTransformationStation(TransformationStationAddDto transformationStationAddDto);

   WaterIntake waterIntakeAddToWaterIntake(WaterIntakeAddDto waterIntakeAddDto);

}
