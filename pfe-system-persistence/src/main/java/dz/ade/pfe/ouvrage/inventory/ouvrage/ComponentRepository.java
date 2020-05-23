package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComponentRepository extends JpaRepository<Component, Long> {

    Boolean existsByOuvrageAndTypeComposant(Ouvrage ouvrage,String typeComposant);

    Boolean existsAllByOuvrageAndTypeComposant(Ouvrage ouvrage,String typeComposant);

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

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'GroupeElecPompe_Moteur'")
    ElectroGroupMotor loadElectroGroupMotor(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'GroupeElecPompe_Pompe'")
    ElectroGroupPump loadElectroGroupPump(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'GroupeElectrogene'")
    Generator loadGenerator(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT component FROM Component component WHERE component.ouvrage = :ouvrage AND component.typeComposant = 'BlocLocal'")
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

    //Pour les types des composants

    @Query("SELECT post FROM ChemicalPosts post WHERE post.ouvrage = :ouvrage AND post.postType = 'PreparationInjection'")
    ChemicalPosts loadPreparationInjection(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT post FROM ChemicalPosts post WHERE post.ouvrage = :ouvrage AND post.postType = 'RecyclageBoues'")
    ChemicalPosts loadRecyclageBoues(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT post FROM ChemicalPosts post WHERE post.ouvrage = :ouvrage AND post.postType = 'RecyclageEauLavage'")
    ChemicalPosts loadRecyclageEauLavage(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM TraitementStationEquipement equipement WHERE equipement.ouvrage = :ouvrage AND equipement.typeEquipement = 'BassinMelange'")
    TraitementStationEquipement loadBassinMelange(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM TraitementStationEquipement equipement WHERE equipement.ouvrage = :ouvrage AND equipement.typeEquipement = 'ComposantAeration'")
    TraitementStationEquipement loadComposantAeration(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM TraitementStationEquipement equipement WHERE equipement.ouvrage = :ouvrage AND equipement.typeEquipement = 'ComposantPretraitement'")
    TraitementStationEquipement loadComposantPretraitement(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM TraitementStationEquipement equipement WHERE equipement.ouvrage = :ouvrage AND equipement.typeEquipement = 'Decanteur'")
    TraitementStationEquipement loadDecanteur(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM TraitementStationEquipement equipement WHERE equipement.ouvrage = :ouvrage AND equipement.typeEquipement = 'Filtre'")
    TraitementStationEquipement loadFiltre(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM TraitementStationEquipement equipement WHERE equipement.ouvrage = :ouvrage AND equipement.typeEquipement = 'ReservoirEauBrute'")
    TraitementStationEquipement loadReservoirEauBrute(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM TraitementStationEquipement equipement WHERE equipement.ouvrage = :ouvrage AND equipement.typeEquipement = 'ReservoirEauTraite'")
    TraitementStationEquipement loadReservoirEauTraite(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'ClapetAntiRetour'")
    HedromecaEquipment loadClapetAntiRetour(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'CollecteurAspiration'")
    HedromecaEquipment loadCollecteurAspiration(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'CollecteurReffoulement'")
    HedromecaEquipment loadCollecteurReffoulement(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'CollenesMontantes'")
    HedromecaEquipment loadCollenesMontantes(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'CompteurDebimetre'")
    HedromecaEquipment loadCompteurDebimetre(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'JointDemantage'")
    HedromecaEquipment loadJointDemantage(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'VannePompage'")
    HedromecaEquipment loadVannePompage(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'Venteuse'")
    HedromecaEquipment loadVenteuse(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'ConduiteTropPlein'")
    HedromecaEquipment loadConduiteTropPlein(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'ConduiteVidange'")
    HedromecaEquipment loadConduiteVidange(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'Echellle'")
    HedromecaEquipment loadEchellle(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'Flotteur'")
    HedromecaEquipment loadFlotteur(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'VanneArrivee'")
    HedromecaEquipment loadVanneArrivee(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'VanneDistribution'")
    HedromecaEquipment loadVanneDistribution(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'Obturateur'")
    HedromecaEquipment loadObturateur(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'CompteurDebimetreSortie'")
    HedromecaEquipment loadCompteurDebimetreSortie(@Param("ouvrage") Ouvrage ouvrage);

    @Query("SELECT equipement FROM HedromecaEquipment equipement WHERE equipement.ouvrage = :ouvrage AND equipement.equipementType = 'JointDemantageSortie'")
    HedromecaEquipment loadJointDemantageSortie(@Param("ouvrage") Ouvrage ouvrage);

}
