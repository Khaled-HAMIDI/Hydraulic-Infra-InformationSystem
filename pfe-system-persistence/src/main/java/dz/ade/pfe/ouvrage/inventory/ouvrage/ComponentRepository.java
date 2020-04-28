package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComponentRepository extends JpaRepository<Component, Long> {

    @Query("SELECT security FROM Security security WHERE security.ouvrage = :ouvrage AND security.typeComposant = 'Security'")
    Security loadSecurity(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'AntiBelier'")
    AntiRam loadAntiRam(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'PosteChloration'")
    ChlorationPost loadChlorationPost(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'ArmoireElectrique'")
    ElectricalCabinet loadElectricalCabinet(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'BatimentElectrique'")
    ElectricBuilding loadElectricBuilding(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'GroupeElecPompe-Moteur'")
    ElectroGroupMotor loadElectroGroupMotor(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'GroupeElecPompe-Pompe'")
    ElectroGroupPump loadElectroGroupPump(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'GroupeElectrogene'")
    Generator loadGenerator(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'Security'")
    LocalBlock loadLocalBlock(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'KitMembrane'")
    MembraneKit loadMembraneKit(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'StationPHP'")
    PhpStation loadPhpStation(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'LocalStockageChimique'")
    ProductStorage loadProductStorage(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'SoupapeDecharge'")
    ReliefValve loadReliefValve(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'PosteTransformationElectrique'")
    TransformationStation loadTransformationStation(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'PriseEau'")
    WaterIntake loadWaterIntake(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'EquipementStationTraitement'")
    List<TraitementStationEquipement> loadTraitementStationEquipement(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'PosteChimique'")
    List<ChemicalPosts> loadChemicalPosts(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'ComposantHydroMecanique'")
    List<HedromecaEquipment> loadHedromecaEquipment(@Param("ouvrage") Ouvrage ouvrage);


}
