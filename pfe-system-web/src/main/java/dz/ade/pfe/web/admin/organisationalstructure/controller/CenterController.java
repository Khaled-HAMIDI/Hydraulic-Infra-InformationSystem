package dz.ade.pfe.web.admin.organisationalstructure.controller;

import dz.ade.pfe.admin.security.user.UserComponent;
import dz.ade.pfe.domain.admin.Center;
import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.web.admin.organisationalstructure.dto.CenterCreateDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.CenterDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.CenterShowDto;
import dz.ade.pfe.web.admin.organisationalstructure.mapper.CenterDtoCenterMapper;
import dz.ade.pfe.domain.exceptions.NotAllowedAffectationException;
import dz.ade.pfe.domain.exceptions.WrongFormatException;
import dz.ade.pfe.web.commons.controller.BaseController;
import dz.ade.pfe.domain.exceptions.ResourceAlreadyExistException;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@RestController
@RequestMapping(value = "/api/centers")
@Api(value = "Centers")
@RequiredArgsConstructor
public class CenterController extends BaseController {

    private final CenterDtoCenterMapper centerDtoCenterMapper;
    private final UserComponent userComponent;

    @GetMapping
    @ApiOperation(value = "View the list of centers")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of agencies"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<CenterDto> getCenters() {
        List<CenterDto> centers = organisationalStructureComponent
                .getCenters().stream()
                .map(center -> centerDtoCenterMapper.centerToCenterDto(center))
                .collect(Collectors.toList());
        return centers;
    }

    @PostMapping
    @ApiOperation(value = "Add new center")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully created a center"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public CenterDto createCenter(@Valid @RequestBody CenterCreateDto centerCreateDto) {
        Unit unit = getDeployedUnit();

        Optional<Center> optionalCenter = organisationalStructureComponent.findNotDeletedCenterByCode(unit.getCode() + centerCreateDto.getCode());
        if (optionalCenter.isPresent()) {
            throw new ResourceAlreadyExistException(String.format("There is already a center with given code %s", unit.getCode() + centerCreateDto.getCode()));
        }

        Center centerToBeSave = centerDtoCenterMapper.centerCreateDtoToCenter(centerCreateDto);

        centerToBeSave.setUnit(unit);
        centerToBeSave.setCode(unit.getCode() + centerToBeSave.getCode());

        Center savedCenter = organisationalStructureComponent
                .createCenter(centerToBeSave);
        return centerDtoCenterMapper.centerToCenterDto(savedCenter);
    }

    @PutMapping(value = "/{code}")
    @ApiOperation(value = "Update center")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully created a center"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public CenterDto updateCenter(@Valid @RequestBody CenterDto centerDto, @PathVariable String code) {
        Center center = organisationalStructureComponent.findNotDeletedCenterByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Center with {Code %s} not found", code)));

        Unit unit =  getDeployedUnit();

        if (!code.equals(unit.getCode() + centerDto.getCode())) {
            Optional<Center> optionalCenter = organisationalStructureComponent.findNotDeletedCenterByCode(unit.getCode() + centerDto.getCode());
            if (optionalCenter.isPresent()) {
                throw new ResourceAlreadyExistException(String.format("There is already a center with given code %s", unit.getCode() + centerDto.getCode()));
            }
        }

        Optional<User> user = userComponent.findNotDeletedByUsername(centerDto.getHeadOfTheStructure());
        if (user.isPresent()) {
            if (!user.get().getOrganisationalStructure().getCode().equals(code)) {
                throw new NotAllowedAffectationException("head of structure selected is not assign to this structure");
            }
        }

        centerDtoCenterMapper.centerDtoToCenterWithTarget(centerDto, center);
        user.ifPresent(center::setHeadOfTheStructure);
        center.setCode(unit.getCode() + center.getCode());

        Center updatedCenter = organisationalStructureComponent.updateCenter(center);
        return centerDtoCenterMapper.centerToCenterDto(updatedCenter);
    }

    @GetMapping(value = "/{code}")
    @ApiOperation(value = "Search for a center with a code")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a center"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<?> getCenterByCode(@PathVariable String code) {

        Optional<Center> center = organisationalStructureComponent.findNotDeletedCenterByCode(code);
        if (!center.isPresent()) {
            throw new ResourceNotFoundException(String.format("Center with {code %s} not found", code));
        }
        CenterShowDto centerShowDto = centerDtoCenterMapper.centerToCenterShowDto(center.get());
        return ResponseEntity.ok(centerShowDto);
    }

    @DeleteMapping
    @ApiOperation(value = "Delete the list of centers")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully Deleted a list of cneters"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<?> delete(@RequestBody List<String> centers) {
        if (centers.isEmpty()) {
            throw new WrongFormatException("centers list selected is Empty");
        }

        return ResponseEntity.ok(organisationalStructureComponent.deleteCenters(centers));
    }
}
