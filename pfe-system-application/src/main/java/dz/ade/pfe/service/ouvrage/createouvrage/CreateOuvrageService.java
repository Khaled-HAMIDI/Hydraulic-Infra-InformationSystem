package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.createouvrage.SaveOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateOuvrageService implements CreateOuvrageQuery {
    //@Autowired
    private final SaveOuvrage saveOuvrage;

    @Override
    public Ouvrage createOuvrage(OuvrageAddDto ouvrageAddDto){

        Ouvrage ouvrage = new Ouvrage();

        ouvrage.setCode(ouvrageAddDto.getCode());
        ouvrage.setName(ouvrageAddDto.getName());
        ouvrage.setType(ouvrageAddDto.getType());
        ouvrage.setEnabled(ouvrageAddDto.getEnabled());
        ouvrage.setForm(ouvrageAddDto.getForm());
        ouvrage.setState(ouvrageAddDto.getState());
        ouvrage.setProcess(ouvrageAddDto.getProcess());
        ouvrage.setNbCompartment(ouvrageAddDto.getNbCompartment());
        ouvrage.setRaftRating(ouvrageAddDto.getRaftRating());
        ouvrage.setCoteTropFull(ouvrageAddDto.getCoteTropFull());
        ouvrage.setCoordinateX(ouvrageAddDto.getCoordinateX());
        ouvrage.setCoordinateY(ouvrageAddDto.getCoordinateY());
        ouvrage.setCoordinateZ(ouvrageAddDto.getCoordinateZ());
        ouvrage.setArea(ouvrageAddDto.getArea());
        ouvrage.setInstalledCapacity(ouvrageAddDto.getInstalledCapacity());
        ouvrage.setCurrentCapacity(ouvrageAddDto.getCurrentCapacity());
        ouvrage.setHmt(ouvrageAddDto.getHmt());
        ouvrage.setPower(ouvrageAddDto.getPower());
        ouvrage.setNbPump(ouvrageAddDto.getNbPump());
        ouvrage.setPumpDebit(ouvrageAddDto.getPumpDebit());
        ouvrage.setConstructionType(ouvrageAddDto.getConstructionType());
        ouvrage.setWaterSource(ouvrageAddDto.getWaterSource());
        ouvrage.setCommissioningDate(ouvrageAddDto.getCommissioningDate());
        ouvrage.setOperatingDate(ouvrageAddDto.getOperatingDate());
        ouvrage.setMaitreOuvrage(ouvrageAddDto.getMaitreOuvrage());
        ouvrage.setRealizationCost(ouvrageAddDto.getRealizationCost());
        ouvrage.setRemoteManagement(ouvrageAddDto.getRemoteManagement());
        ouvrage.setWaterTank(ouvrageAddDto.getWaterTank());
        ouvrage.setTankCapacity1(ouvrageAddDto.getTankCapacity1());
        ouvrage.setTankCapacity2(ouvrageAddDto.getTankCapacity2());
        ouvrage.setSpecializedLine(ouvrageAddDto.getSpecializedLine());
        ouvrage.setAbri(ouvrageAddDto.getAbri());
        ouvrage.setEnergyMonthlyBill(ouvrageAddDto.getEnergyMonthlyBill());
        ouvrage.setTotalWorkforce(ouvrageAddDto.getTotalWorkforce());
        ouvrage.setDistribution(ouvrageAddDto.getDistribution());
        ouvrage.setPopulationServed(ouvrageAddDto.getPopulationServed());
        ouvrage.setChemicalMonthlyBill(ouvrageAddDto.getChemicalMonthlyBill());
        ouvrage.setCoteTn(ouvrageAddDto.getCoteTn());
        ouvrage.setDebitLoadBreaker(ouvrageAddDto.getDebitLoadBreaker());
        ouvrage.setChargesAmontEtAval(ouvrageAddDto.getChargesAmontEtAval());
        ouvrage.setCurrentDebit(ouvrageAddDto.getCurrentDebit());
        ouvrage.setElectricAlimentation(ouvrageAddDto.getElectricAlimentation());
        ouvrage.setExploitationDebit(ouvrageAddDto.getExploitationDebit());
        ouvrage.setTankType(ouvrageAddDto.getTankType());
        ouvrage.setTankRole(ouvrageAddDto.getTankRole());
        ouvrage.setTreatmentStationType(ouvrageAddDto.getTreatmentStationType());


        return saveOuvrage.saveOuvrage(ouvrage);
    }
}

