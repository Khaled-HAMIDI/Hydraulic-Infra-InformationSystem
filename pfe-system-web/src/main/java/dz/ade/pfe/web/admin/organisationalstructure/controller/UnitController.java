package dz.ade.pfe.web.admin.organisationalstructure.controller;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.admin.security.user.UserComponent;
import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.web.admin.organisationalstructure.dto.UnitDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.UnitEditDto;
import dz.ade.pfe.web.admin.organisationalstructure.mapper.UnitDtoUnitMapper;
import dz.ade.pfe.domain.exceptions.NotAllowedAffectationException;
import dz.ade.pfe.web.utils.ProfileManager;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@RestController
@RequestMapping(value = "/api/units")
@Api(value = "Centers", description = "Operations on centers")
public class UnitController {

    private OrganisationalStructureComponent organisationalStructureComponent;
    private UnitDtoUnitMapper unitDtoUnitMapper;
    private ProfileManager profileManager;
    private UserComponent userComponent;

    public UnitController(OrganisationalStructureComponent organisationalStructureComponent,
                          ProfileManager profileManager,
                          UnitDtoUnitMapper unitDtoUnitMapper,
                          UserComponent userComponent) {
        this.organisationalStructureComponent = organisationalStructureComponent;
        this.unitDtoUnitMapper = unitDtoUnitMapper;
        this.profileManager = profileManager;
        this.userComponent = userComponent;
    }

    @GetMapping(value = "/deployedunit")
    @ApiOperation(value = "get unit deployed")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a unit"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public UnitDto getDeployedUnit() {
        Optional<Unit> unit = organisationalStructureComponent
                .getUnitByCode(profileManager.getDeployedUnitCode());
        if (!unit.isPresent()) {
            throw new ResourceNotFoundException(String.format("Unit with {code %s} not found",
                    profileManager.getDeployedUnitCode()));
        }

        return unitDtoUnitMapper.unitToUnitDto(unit.get());
    }


    @PutMapping(value = "/deployedunit")
    @ApiOperation(value = "update unit deployed")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a unit"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public int updateDeployedUnit(@RequestBody UnitEditDto unitEditDto) {
        Optional<Unit> unit = organisationalStructureComponent
                .getUnitByCode(profileManager.getDeployedUnitCode());
        if (!unit.isPresent()) {
            throw new ResourceNotFoundException(String.format("Unit with {code %s} not found",
                    profileManager.getDeployedUnitCode()));
        }

        Unit unitToBeUpdated = unit.get();

        Optional<User> user = userComponent.findByUsername(unitEditDto.getHeadOfTheStructure());
        if (user.isPresent()) {
            if (!user.get().getOrganisationalStructure().getCode().equals(unitToBeUpdated.getCode())) {
                throw new NotAllowedAffectationException("head of structure selected is not assign to this structure");
            }
        }

        unitDtoUnitMapper.unitEditDtoToUnitWithTarget(unitEditDto, unitToBeUpdated);
        user.ifPresent(unitToBeUpdated::setHeadOfTheStructure);

        organisationalStructureComponent.updateUnit(unitToBeUpdated);
        return 1;
    }
}
