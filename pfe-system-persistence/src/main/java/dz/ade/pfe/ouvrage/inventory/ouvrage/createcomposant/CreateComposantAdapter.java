package dz.ade.pfe.ouvrage.inventory.ouvrage.createcomposant;

import dz.ade.pfe.domain.ouvrage.*;
import dz.ade.pfe.ouvrage.inventory.ouvrage.createcomposant.repositories.*;
import dz.ade.pfe.port.out.ouvrage.createcomposant.SaveComposant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class CreateComposantAdapter implements SaveComposant {

    private final SecurityRepository securityRepository;
    private final AntiRamRepository antiRamRepository;
    private final ChemicalPostsRepository chemicalPostsRepository;
    private final ChlorationPostRepository chlorationPostRepository;
    private final ElectricBuildingRepository electricBuildingRepository;
    private final ElectricalCabinetRepository electricalCabinetRepository ;
    private final ElectroGroupMotorRepository electroGroupMotorRepository ;
    private final ElectroGroupPumpRepository electroGroupPumpRepository ;
    private final GeneratorRepository generatorRepository ;
    private final HedromeacaEquipementRepository hedromeacaEquipementRepository ;
    private final LocalBlockRepository localBlockRepository ;
    private final MembraneKitRepository membraneKitRepository ;
    private final PhpStationRepository phpStationRepository ;
    private final ProductStorageRepository productStorageRepository ;
    private final ReliefValveRepository reliefValveRepository ;
    private final TraitementStationEquipementRepository traitementStationEquipementRepository ;
    private final TransformationStationRepository transformationStationRepository ;
    private final WaterIntakeRepository waterIntakeRepository ;

    @Override
    public Security saveSecurity(Security security) {
        securityRepository.save(security);
        return security;
    }

    @Override
    public AntiRam saveAntiRam(AntiRam antiRam) {
        antiRamRepository.save(antiRam);
        return antiRam;
    }

    @Override
    public ChemicalPosts saveChemicalPosts(ChemicalPosts chemicalPosts) {
        chemicalPostsRepository.save(chemicalPosts);
        return chemicalPosts;
    }

    @Override
    public ChlorationPost saveChlorationPost(ChlorationPost chlorationPost) {
        chlorationPostRepository.save(chlorationPost);
        return chlorationPost;
    }

    @Override
    public ElectricalCabinet saveElectricalCabinet(ElectricalCabinet electricalCabinet) {
        electricalCabinetRepository.save(electricalCabinet);
        return electricalCabinet;
    }

    @Override
    public ElectricBuilding saveElectricBuilding(ElectricBuilding electricBuilding) {
        electricBuildingRepository.save(electricBuilding);
        return electricBuilding;
    }

    @Override
    public ElectroGroupMotor saveElectroGroupMotor(ElectroGroupMotor electroGroupMotor) {
        electroGroupMotorRepository.save(electroGroupMotor);
        return electroGroupMotor;
    }

    @Override
    public ElectroGroupPump saveElectroGroupPump(ElectroGroupPump electroGroupPump) {
        electroGroupPumpRepository.save(electroGroupPump);
        return electroGroupPump;
    }

    @Override
    public Generator saveGenerator(Generator generator) {
        generatorRepository.save(generator);
        return generator;
    }

    @Override
    public HedromecaEquipment saveHedromecaEquipment(HedromecaEquipment hedromecaEquipment) {
        hedromeacaEquipementRepository.save(hedromecaEquipment);
        return hedromecaEquipment;
    }

    @Override
    public LocalBlock saveLocalBlock(LocalBlock localBlock) {
        localBlockRepository.save(localBlock);
        return localBlock;
    }

    @Override
    public MembraneKit saveMembraneKit(MembraneKit membraneKit) {
        membraneKitRepository.save(membraneKit);
        return membraneKit;
    }

    @Override
    public PhpStation savePhpStation(PhpStation phpStation) {
        phpStationRepository.save(phpStation);
        return phpStation;
    }

    @Override
    public ProductStorage saveProductStorage(ProductStorage productStorage) {
        productStorageRepository.save(productStorage);
        return productStorage;
    }

    @Override
    public ReliefValve saveReliefValve(ReliefValve reliefValve) {
        reliefValveRepository.save(reliefValve);
        return reliefValve;
    }

    @Override
    public TransformationStation saveTransformationStation(TransformationStation transformationStation) {
        transformationStationRepository.save(transformationStation);
        return transformationStation;
    }

    @Override
    public TraitementStationEquipement saveTraitementStationEquipement(TraitementStationEquipement traitementStationEquipement) {
        traitementStationEquipementRepository.save(traitementStationEquipement);
        return traitementStationEquipement;
    }

    @Override
    public WaterIntake saveWaterIntake(WaterIntake waterIntake) {
        waterIntakeRepository.save(waterIntake);
        return waterIntake;
    }
}
