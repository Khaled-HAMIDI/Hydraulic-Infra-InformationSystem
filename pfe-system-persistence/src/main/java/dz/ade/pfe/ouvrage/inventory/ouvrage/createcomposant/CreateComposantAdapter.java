package dz.ade.pfe.ouvrage.inventory.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.ouvrage.inventory.ouvrage.ComponentRepository;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.ouvrage.createcomposant.SaveComposant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class CreateComposantAdapter implements SaveComposant {

    private final OuvrageRepository ouvrageRepository ;
    private final ComponentRepository componentRepository;

    @Override
    public Security saveSecurity(Security security,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        security.setOuvrage(ouvrage);

        /*
        dz.ade.pfe.domain.ouvrage.Component component=new dz.ade.pfe.domain.ouvrage.Component();
        component.setOuvrage(ouvrage);
        componentRepository.save(component);
        */

        componentRepository.save(security);

        return security;
    }

    @Override
    public AntiRam saveAntiRam(AntiRam antiRam,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        antiRam.setOuvrage(ouvrage);

        componentRepository.save(antiRam);


        return antiRam;
    }

    @Override
    public ChemicalPosts saveChemicalPosts(ChemicalPosts chemicalPosts,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        chemicalPosts.setOuvrage(ouvrage);

        componentRepository.save(chemicalPosts);

        return chemicalPosts;
    }

    @Override
    public ChlorationPost saveChlorationPost(ChlorationPost chlorationPost,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        chlorationPost.setOuvrage(ouvrage);

        componentRepository.save(chlorationPost);


        return chlorationPost;
    }

    @Override
    public ElectricalCabinet saveElectricalCabinet(ElectricalCabinet electricalCabinet,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electricalCabinet.setOuvrage(ouvrage);

        componentRepository.save(electricalCabinet);


        return electricalCabinet;
    }

    @Override
    public ElectricBuilding saveElectricBuilding(ElectricBuilding electricBuilding,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electricBuilding.setOuvrage(ouvrage);

        componentRepository.save(electricBuilding);


        return electricBuilding;
    }

    @Override
    public ElectroGroupMotor saveElectroGroupMotor(ElectroGroupMotor electroGroupMotor,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electroGroupMotor.setOuvrage(ouvrage);

        componentRepository.save(electroGroupMotor);

        return electroGroupMotor;
    }

    @Override
    public ElectroGroupPump saveElectroGroupPump(ElectroGroupPump electroGroupPump,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        electroGroupPump.setOuvrage(ouvrage);

        componentRepository.save(electroGroupPump);


        return electroGroupPump;
    }

    @Override
    public Generator saveGenerator(Generator generator,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        generator.setOuvrage(ouvrage);

        componentRepository.save(generator);

        return generator;
    }

    @Override
    public HedromecaEquipment saveHedromecaEquipment(HedromecaEquipment hedromecaEquipment,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        hedromecaEquipment.setOuvrage(ouvrage);

        componentRepository.save(hedromecaEquipment);


       return hedromecaEquipment;
    }

    @Override
    public LocalBlock saveLocalBlock(LocalBlock localBlock,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        localBlock.setOuvrage(ouvrage);

        componentRepository.save(localBlock);


        return localBlock;
    }

    @Override
    public MembraneKit saveMembraneKit(MembraneKit membraneKit,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        membraneKit.setOuvrage(ouvrage);

        componentRepository.save(membraneKit);


        return membraneKit;
    }

    @Override
    public PhpStation savePhpStation(PhpStation phpStation,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        phpStation.setOuvrage(ouvrage);

        componentRepository.save(phpStation);


        return phpStation;
    }

    @Override
    public ProductStorage saveProductStorage(ProductStorage productStorage,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        productStorage.setOuvrage(ouvrage);

        componentRepository.save(productStorage);


        return productStorage;
    }

    @Override
    public ReliefValve saveReliefValve(ReliefValve reliefValve,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        reliefValve.setOuvrage(ouvrage);

        componentRepository.save(reliefValve);


        return reliefValve;
    }

    @Override
    public TransformationStation saveTransformationStation(TransformationStation transformationStation,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        transformationStation.setOuvrage(ouvrage);

        componentRepository.save(transformationStation);

        return transformationStation;
    }

    @Override
    public TraitementStationEquipement saveTraitementStationEquipement(TraitementStationEquipement traitementStationEquipement,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        traitementStationEquipement.setOuvrage(ouvrage);

        componentRepository.save(traitementStationEquipement);

        return traitementStationEquipement;
    }

    @Override
    public WaterIntake saveWaterIntake(WaterIntake waterIntake,String code) {

        Ouvrage ouvrage = ouvrageRepository.findByCode(code);
        waterIntake.setOuvrage(ouvrage);

        componentRepository.save(waterIntake);

        return waterIntake;
    }

}
