package dz.ade.pfe.ouvrage.inventory.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.ouvrage.inventory.ouvrage.ComponentRepository;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.ouvrage.createcomposant.SaveComposant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Null;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;


@Component
@RequiredArgsConstructor
public class CreateComposantAdapter implements SaveComposant {

    private final OuvrageRepository ouvrageRepository ;
    private final ComponentRepository componentRepository;

    @Override
    public Security saveSecurity(Security security,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        security.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"Security")) {
            Security old = componentRepository.loadSecurity(ouvrage);
            componentRepository.delete(old);
        }
        componentRepository.save(security);

        return security;
    }

    @Override
    public AntiRam saveAntiRam(AntiRam antiRam,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        antiRam.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"AntiBelier")) {
            AntiRam old = componentRepository.loadAntiRam(ouvrage);
            componentRepository.delete(old);

        }
        componentRepository.save(antiRam);


        return antiRam;
    }

    @Override
    public ChemicalPosts saveChemicalPosts(ChemicalPosts chemicalPosts,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        chemicalPosts.setOuvrage(ouvrage);

        ChemicalPosts old = new ChemicalPosts();
        String type = chemicalPosts.getPostType();


        switch (type){
            case "PreparationInjection":
                old = componentRepository.loadPreparationInjection(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "RecyclageBoues" :
                old = componentRepository.loadRecyclageBoues(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "RecyclageEauLavage" :
                old = componentRepository.loadRecyclageEauLavage(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
        }

        componentRepository.save(chemicalPosts);


        return chemicalPosts;
    }

    @Override
    public ChlorationPost saveChlorationPost(ChlorationPost chlorationPost,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        chlorationPost.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"PosteChloration")) {
            ChlorationPost old = componentRepository.loadChlorationPost(ouvrage);
            componentRepository.delete(old);
        }

        componentRepository.save(chlorationPost);

        return chlorationPost;
    }

    @Override
    public ElectricalCabinet saveElectricalCabinet(ElectricalCabinet electricalCabinet,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electricalCabinet.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"ArmoireElectrique")) {
            componentRepository.save(electricalCabinet);
            ElectricalCabinet old = componentRepository.loadElectricalCabinet(ouvrage);
            componentRepository.delete(old);
        }
        componentRepository.save(electricalCabinet);


        return electricalCabinet;
    }

    @Override
    public ElectricBuilding saveElectricBuilding(ElectricBuilding electricBuilding,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electricBuilding.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"BatimentElectrique")) {
            ElectricBuilding old = componentRepository.loadElectricBuilding(ouvrage);
            componentRepository.delete(old);
        }
        componentRepository.save(electricBuilding);


        return electricBuilding;
    }

    @Override
    public ElectroGroupMotor saveElectroGroupMotor(ElectroGroupMotor electroGroupMotor,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electroGroupMotor.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"GroupeElecPompe-Moteur")) {
            componentRepository.save(electroGroupMotor);
            ElectroGroupMotor old = componentRepository.loadElectroGroupMotor(ouvrage);
            componentRepository.delete(old);
        }

        componentRepository.save(electroGroupMotor);
        return electroGroupMotor;
    }

    @Override
    public ElectroGroupPump saveElectroGroupPump(ElectroGroupPump electroGroupPump,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electroGroupPump.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"GroupeElecPompe-Pompe")) {
            ElectroGroupPump old = componentRepository.loadElectroGroupPump(ouvrage);
            componentRepository.delete(old);
        }
        componentRepository.save(electroGroupPump);

        return electroGroupPump;
    }

    @Override
    public Generator saveGenerator(Generator generator,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        generator.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"GroupeElectrogene")) {
            Generator old = componentRepository.loadGenerator(ouvrage);
            componentRepository.delete(old);
        }
        componentRepository.save(generator);
        return generator;
    }

    @Override
    public HedromecaEquipment saveHedromecaEquipment(HedromecaEquipment hedromecaEquipment,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        hedromecaEquipment.setOuvrage(ouvrage);

        HedromecaEquipment old = new HedromecaEquipment();
        String type = hedromecaEquipment.getEquipementType();


        switch (type){
            case "ClapetAntiRetour":
                old = componentRepository.loadClapetAntiRetour(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "CollecteurAspiration" :
                old = componentRepository.loadCollecteurAspiration(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "CollecteurReffoulement" :
                old = componentRepository.loadCollecteurReffoulement(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "CollenesMontantes" :
                old = componentRepository.loadCollenesMontantes(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "CompteurDebimetre" :
                old = componentRepository.loadCompteurDebimetre(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "JointDemantage" :
                old = componentRepository.loadJointDemantage(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "VannePompage" :
                old = componentRepository.loadVannePompage(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "Venteuse":
                old = componentRepository.loadVenteuse(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "ConduiteTropPlein" :
                old = componentRepository.loadConduiteTropPlein(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "ConduiteVidange" :
                old = componentRepository.loadConduiteVidange(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "Echellle" :
                old = componentRepository.loadEchellle(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "Flotteur" :
                old = componentRepository.loadFlotteur(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "VanneArrivee" :
                old = componentRepository.loadVanneArrivee(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "VanneDistribution" :
                old = componentRepository.loadVanneDistribution(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "Obturateur" :
                old = componentRepository.loadObturateur(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "CompteurDebimetreSortie" :
                old = componentRepository.loadCompteurDebimetreSortie(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "JointDemantageSortie" :
                old = componentRepository.loadJointDemantageSortie(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
        }


        componentRepository.save(hedromecaEquipment);

       return hedromecaEquipment;
    }

    @Override
    public LocalBlock saveLocalBlock(LocalBlock localBlock,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        localBlock.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"BlocLocal")) {
            LocalBlock old = componentRepository.loadLocalBlock(ouvrage);
            componentRepository.delete(old);
        }

        componentRepository.save(localBlock);

        return localBlock;
    }

    @Override
    public MembraneKit saveMembraneKit(MembraneKit membraneKit,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        membraneKit.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"KitMembrane")) {
            MembraneKit old = componentRepository.loadMembraneKit(ouvrage);
            componentRepository.delete(old);

        }
        componentRepository.save(membraneKit);

        return membraneKit;
    }

    @Override
    public PhpStation savePhpStation(PhpStation phpStation,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        phpStation.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"StationPHP")) {
            PhpStation old = componentRepository.loadPhpStation(ouvrage);
            componentRepository.delete(old);

        }
        componentRepository.save(phpStation);
        return phpStation;
    }

    @Override
    public ProductStorage saveProductStorage(ProductStorage productStorage,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        productStorage.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"LocalStockageChimique")) {
            ProductStorage old = componentRepository.loadProductStorage(ouvrage);
            componentRepository.delete(old);
        }

        componentRepository.save(productStorage);
        return productStorage;
    }

    @Override
    public ReliefValve saveReliefValve(ReliefValve reliefValve,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        reliefValve.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"SoupapeDecharge")) {
            ReliefValve old = componentRepository.loadReliefValve(ouvrage);
            componentRepository.delete(old);

        }

        componentRepository.save(reliefValve);
        return reliefValve;
    }

    @Override
    public TransformationStation saveTransformationStation(TransformationStation transformationStation,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        transformationStation.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"PosteTransformationElectrique")) {
            TransformationStation old = componentRepository.loadTransformationStation(ouvrage);
            componentRepository.delete(old);

        }

        componentRepository.save(transformationStation);
        return transformationStation;
    }

    @Override
    public TraitementStationEquipement saveTraitementStationEquipement(TraitementStationEquipement traitementStationEquipement,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        traitementStationEquipement.setOuvrage(ouvrage);

        TraitementStationEquipement old = new TraitementStationEquipement();
        String type = traitementStationEquipement.getTypeEquipement();


        switch (type){
            case "BassinMelange":
                old = componentRepository.loadBassinMelange(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "ComposantAeration" :
                old = componentRepository.loadComposantAeration(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "ComposantPretraitement" :
                old = componentRepository.loadComposantPretraitement(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "Decanteur" :
                old = componentRepository.loadDecanteur(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "Filtre" :
                old = componentRepository.loadFiltre(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "ReservoirEauBrute" :
                old = componentRepository.loadReservoirEauBrute(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
            case "ReservoirEauTraite" :
                old = componentRepository.loadReservoirEauTraite(ouvrage);
                if (old != null) componentRepository.delete(old);
                break;
        }

        componentRepository.save(traitementStationEquipement);
        return traitementStationEquipement;
    }

    @Override
    public WaterIntake saveWaterIntake(WaterIntake waterIntake,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        waterIntake.setOuvrage(ouvrage);

        if (componentRepository.existsByOuvrageAndTypeComposant(ouvrage,"PriseEau")) {
            WaterIntake old= componentRepository.loadWaterIntake(ouvrage);
            componentRepository.delete(old);
        }

        componentRepository.save(waterIntake);
        return waterIntake;
    }

}
