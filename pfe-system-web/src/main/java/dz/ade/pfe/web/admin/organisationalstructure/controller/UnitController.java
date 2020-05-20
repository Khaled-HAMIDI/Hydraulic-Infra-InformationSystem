package dz.ade.pfe.web.admin.organisationalstructure.controller;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.admin.security.user.UserComponent;
import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.web.admin.organisationalstructure.dto.UnitDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.UnitEditDto;
import dz.ade.pfe.web.admin.organisationalstructure.mapper.UnitDtoUnitMapper;
import dz.ade.pfe.domain.exceptions.NotAllowedAffectationException;
import dz.ade.pfe.web.commons.controller.BaseController;
import dz.ade.pfe.web.utils.ProfileManager;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@RestController
@RequestMapping(value = "/api/units")
@Api(value = "Units")
@RequiredArgsConstructor
public class UnitController extends BaseController {

    private final UnitDtoUnitMapper unitDtoUnitMapper;
    private final UserComponent userComponent;

    @GetMapping(value = "/deployedunit")
    @ApiOperation(value = "get unit deployed")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a unit"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public UnitDto getDeployedUnitDto() {
        Unit unit = getDeployedUnit();

        return unitDtoUnitMapper.unitToUnitDto(unit);
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
        Unit unit = getDeployedUnit();

        Optional<User> user = userComponent.findByUsername(unitEditDto.getHeadOfTheStructure());
        if (user.isPresent()) {
            if (!user.get().getOrganisationalStructure().getCode().equals(unit.getCode())) {
                throw new NotAllowedAffectationException("head of structure selected is not assign to this structure");
            }
        }

        unitDtoUnitMapper.unitEditDtoToUnitWithTarget(unitEditDto, unit);
        user.ifPresent(unit::setHeadOfTheStructure);

        organisationalStructureComponent.updateUnit(unit);
        return 1;
    }
}
