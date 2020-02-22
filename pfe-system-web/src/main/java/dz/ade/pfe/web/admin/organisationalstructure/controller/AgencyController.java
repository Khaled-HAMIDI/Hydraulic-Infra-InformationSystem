package dz.ade.pfe.web.admin.organisationalstructure.controller;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.admin.security.user.UserComponent;
import dz.ade.pfe.domain.admin.Agency;
import dz.ade.pfe.domain.admin.Center;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.domain.exceptions.NotAllowedAffectationException;
import dz.ade.pfe.domain.exceptions.ResourceAlreadyExistException;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.exceptions.WrongFormatException;
import dz.ade.pfe.web.admin.organisationalstructure.dto.AgencyCreateDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.AgencyDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.AgencyShowDto;
import dz.ade.pfe.web.admin.organisationalstructure.mapper.AgencyDtoAgencyMapper;
import dz.ade.pfe.web.security.auth.TokenHelper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@RestController
@RequestMapping(value = "/api")
@Api(value = "Agencies", description = "Operations on agencies")
public class AgencyController {

    private OrganisationalStructureComponent organisationalStructureComponent;
    private AgencyDtoAgencyMapper agencyDtoAgencyMapper;
    private UserComponent userComponent;
    private TokenHelper tokenHelper;

    public AgencyController(OrganisationalStructureComponent organisationalStructureComponent,
                            UserComponent userComponent,
                            TokenHelper tokenHelper) {
        this.organisationalStructureComponent = organisationalStructureComponent;
        this.agencyDtoAgencyMapper = agencyDtoAgencyMapper;
        this.tokenHelper = tokenHelper;
    }

    @GetMapping(value = "/agencies")
    @ApiOperation(value = "View the list of agencies")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of agencies"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<AgencyDto> getAgencies() {
        return organisationalStructureComponent
                .getAgencies().stream()
                .map(agency -> agencyDtoAgencyMapper.agencyToAgencyDto(agency))
                .collect(Collectors.toList());
    }

    @DeleteMapping(value = "/agencies")
    @ApiOperation(value = "Delete the list of agencies")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully Deleted a list of agencies"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<?> delete(@RequestBody List<String> agencies) {
        if (agencies.isEmpty()) {
            throw new WrongFormatException("agencies list selected is Empty");
        }
        int i;
        try {
            i = organisationalStructureComponent.deleteAgencies(agencies);
            userComponent.disableUsersByOrganisationalStructureCodes(agencies);
        } catch (Exception e) {
            throw new ResourceNotFoundException("There is problems deleting agencies");
        }
        return ResponseEntity.ok(i);
    }

    @PostMapping(value = "/agencies")
    @ApiOperation(value = "Add new agency")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully created a agency"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public AgencyDto createAgency(@Valid @RequestBody AgencyCreateDto agencyCreateDto) {

        Center center = organisationalStructureComponent.findNotDeletedCenterByCode(agencyCreateDto.getCenter())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Center with {Code %s} not found", agencyCreateDto.getCenter())));

        Optional<Agency> agency = organisationalStructureComponent.findNotDeletedAgencyByCode(center.getCode() + agencyCreateDto.getCode());
        if (agency.isPresent()) {
            throw new ResourceAlreadyExistException(String.format("There is already a agency with given code %s", center.getCode() + agencyCreateDto.getCode()));
        }

        Agency agencyToBeSave = agencyDtoAgencyMapper.agencyCreateDtoToAgency(agencyCreateDto);
        agencyToBeSave.setCenter(center);
        agencyToBeSave.setCode(center.getCode() + agencyToBeSave.getCode());

        Agency savedAgency = organisationalStructureComponent
                .createAgency(agencyToBeSave);
        int year = Calendar.getInstance().get(Calendar.YEAR);
        List<Agency> theAgency= new ArrayList<>();
        theAgency.add(savedAgency);
        return agencyDtoAgencyMapper.agencyToAgencyDto(savedAgency);
    }

    @PutMapping(value = "/agencies/{code}")
    @ApiOperation(value = "Update agency")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully created a agency"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public AgencyShowDto updateAgency(@Valid @RequestBody AgencyDto agencyDto, @PathVariable String code) {
        Agency agency = organisationalStructureComponent.findNotDeletedAgencyByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Agency with {Code %s} not found", code)));

        Center center = organisationalStructureComponent.getCenter(agencyDto.getCenter())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Center with {Code %s} not found", agencyDto.getCenter())));

        if (!code.equals(center.getCode() + agencyDto.getCode())) {
            Optional<Agency> optionalAgency = organisationalStructureComponent.findNotDeletedAgencyByCode(center.getCode() + agencyDto.getCode());
            if (optionalAgency.isPresent()) {
                throw new ResourceAlreadyExistException(String.format("There is already a agency with given code %s", center.getCode() + agencyDto.getCode()));
            }
        }

        Optional<User> user = userComponent.findByUsername(agencyDto.getHeadOfTheStructure());
        if (user.isPresent()) {
            if (!user.get().getOrganisationalStructure().getCode().equals(code)) {
                throw new NotAllowedAffectationException("head of structure selected is not assign to this structure");
            }
        }

        agencyDtoAgencyMapper.agencyDtoToAgencyWithTarget(agencyDto, agency);
        user.ifPresent(agency::setHeadOfTheStructure);
        agency.setCenter(center);
        agency.setCode(center.getCode() + agency.getCode());

        Agency updatedAgency = organisationalStructureComponent.updateAgency(agency);
        return agencyDtoAgencyMapper.agencyToAgencyShowDto(updatedAgency);
    }

    @GetMapping(value = "/agencies/{code}")
    @ApiOperation(value = "Search for a agency with a code")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a agency"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<?> getAgencyByCode(@PathVariable String code) {

        Optional<Agency> agency = organisationalStructureComponent.getAgency(code);
        if (!agency.isPresent()) {
            throw new ResourceNotFoundException(String.format("Agency with {code %s} not found", code));
        }

        AgencyShowDto agencyShowDto = agencyDtoAgencyMapper.agencyToAgencyShowDto(agency.get());
        return ResponseEntity.ok(agencyShowDto);
    }

    @GetMapping(value = "/centers/{code}/agencies")
    @ApiOperation(value = "View the list of users to be heads of the structure")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of agencies"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<AgencyDto> getAllHeadsByOrganisationalStructure(@PathVariable String code) {
        Optional<Center> optCenter = organisationalStructureComponent.getCenter(code);
        if (!optCenter.isPresent()) {
            throw new ResourceNotFoundException(String.format("Center with {code %s} not found", code));
        }

        Center center = optCenter.get();

        return center.getAgencies().stream()
                .map(agency -> agencyDtoAgencyMapper.agencyToAgencyDto(agency))
                .collect(Collectors.toList());
    }
}
