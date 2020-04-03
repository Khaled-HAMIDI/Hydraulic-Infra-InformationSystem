package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.createouvrage.CreateOuvrageQuery;
import dz.ade.pfe.service.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.createouvrage.OuvrageOuvrageDtoMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage", description = "Operations on ouvrage")
@Component
@RequiredArgsConstructor
public class CreateOuvrageController {

    private final CreateOuvrageQuery createOuvrageQuery;
    private OuvrageOuvrageDtoMapper ouvrageOuvrageDtoMapper;


    @PostMapping(value = "/ouvrage")
    @ApiOperation(value = "Save an ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an ouvrage"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public Ouvrage createOuvrage(@RequestBody OuvrageAddDto ouvrageAddDto) {
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
        ouvrage.setTankCapacity(ouvrageAddDto.getTankCapacity());
        ouvrage.setSpecializedLine(ouvrageAddDto.getSpecializedLine());
        ouvrage.setAbri(ouvrageAddDto.getAbri());
        ouvrage.setEnergyMonthlyBill(ouvrageAddDto.getEnergyMonthlyBill());
        ouvrage.setTotalWorkforce(ouvrageAddDto.getTotalWorkforce());
        ouvrage.setDistribution(ouvrageAddDto.getDistribution());
        ouvrage.setPopulationServed(ouvrageAddDto.getPopulationServed());





        return createOuvrageQuery.createOuvrage(ouvrage);
    }
}
