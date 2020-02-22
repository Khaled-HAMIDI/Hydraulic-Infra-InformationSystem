package dz.ade.pfe.web.commons.district.controller;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.commons.district.DistrictComponent;
import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.admin.Agency;
import dz.ade.pfe.domain.commons.District;
import dz.ade.pfe.domain.exceptions.ResourceAlreadyExistException;
import dz.ade.pfe.domain.exceptions.UserNotAuthorizedException;
import dz.ade.pfe.domain.exceptions.WrongFormatException;
import dz.ade.pfe.web.commons.district.dto.*;
import dz.ade.pfe.web.commons.district.mapper.DistrictDtoDistrictMapper;
import dz.ade.pfe.web.commons.street.dto.StreetDistrictListDto;
import dz.ade.pfe.web.security.auth.TokenHelper;
import dz.ade.pfe.web.utils.SecurityUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Users", description = "Operations on districs")
public class DistrictController {

    private DistrictComponent districtComponent;
    private DistrictDtoDistrictMapper districtDtoDistrictMapper;
    private TokenHelper tokenHelper;
    private OrganisationalStructureComponent organisationalStructureComponent;

    public DistrictController(DistrictComponent districtComponent,
                              TokenHelper tokenHelper,
                              OrganisationalStructureComponent organisationalStructureComponent,
                              DistrictDtoDistrictMapper districtDtoDistrictMapper) {
        this.districtComponent = districtComponent;
        this.tokenHelper = tokenHelper;
        this.organisationalStructureComponent = organisationalStructureComponent;
        this.districtDtoDistrictMapper = districtDtoDistrictMapper;
    }

    @GetMapping(value = "/districts")
    @PreAuthorize("hasAnyAuthority('*:*', 'SHOW')")
    @ApiOperation(value = "View a list of available districs")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of districs"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<DistrictDto> getDistrics(HttpServletRequest httpServletRequest) {
        List<String> roles = SecurityUtils.getConnectedUserRoles(httpServletRequest, tokenHelper);

        Optional<String> authToken = tokenHelper.getToken(httpServletRequest);
        if (!authToken.isPresent()) {
            throw new UserNotAuthorizedException("Full authentication is required to access this resource");
        }

        Optional<String> structure = tokenHelper.getOrganisationelStructureFromToken(authToken.get());
        if (!structure.isPresent()) {
            throw new UserNotAuthorizedException("user not affected to structure");
        }

        Optional<Agency> agency = organisationalStructureComponent.getAgency(structure.get());
        if (!agency.isPresent()) {
            throw new UserNotAuthorizedException("user not affected to agency");
        }

        return districtComponent.getDistricts(agency.get().getCode())
                .stream()
                .map(district -> districtDtoDistrictMapper.districtToDistrictDto(district))
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/districtsList")
    @ApiOperation(value = "View a list of available districts")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of districts"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<DistrictListDto> getDistricts(HttpServletRequest httpServletRequest) {
        Optional<String> authToken = tokenHelper.getToken(httpServletRequest);
        if (!authToken.isPresent()) {
            throw new UserNotAuthorizedException("Full authentication is required to access this resource");
        }

        Optional<String> structure = tokenHelper.getOrganisationelStructureFromToken(authToken.get());
        if (!structure.isPresent()) {
            throw new UserNotAuthorizedException("user not affected to structure");
        }

        Optional<OrganisationalStructure> organisationalStructure = organisationalStructureComponent.getStructure(structure.get());
        if (!organisationalStructure.isPresent()) {
            throw new UserNotAuthorizedException("not found");
        }

        List<District> districts = districtComponent.getListDistrictsByStructure(organisationalStructure.get().getCode(),
                organisationalStructure.get().getStructureType());

        return districtDtoDistrictMapper.districtToDistrictListDto(districts);
    }


    @GetMapping(value = "/districtsList/{code}")
    @ApiOperation(value = "Search for a district with a code")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a district"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public DistrictShowDto getDistrict(@PathVariable String code) {

        Optional<District> district = districtComponent.getDistrictByCode(code);
        if (!district.isPresent()) {
            throw new ResourceNotFoundException(String.format("Resource with {ID %s} not found", code));
        }

        return districtDtoDistrictMapper.districtToDistrictShowDto(district.get());
    }

    @PostMapping(value = "/districtsList")
    @ApiOperation(value = "Add a district")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of available districts"),
            @ApiResponse(code = 401, message = "You are not authorized to get the list of districts"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "Not district found")
    })
    public DistrictShowDto createDistrict(@Valid @RequestBody DistrictAddDto districtAddDto,HttpServletRequest httpServletRequest) {
        Optional<District> districtByCode = districtComponent.getDistrictByCode(districtAddDto.getCode());
        if (districtByCode.isPresent()) {
            throw new ResourceAlreadyExistException(String.format("There is already a district with given code %s", districtAddDto.getCode()));
        }
        Optional<String> authToken = tokenHelper.getToken(httpServletRequest);
        if (!authToken.isPresent()) {
            throw new UserNotAuthorizedException("Full authentication is required to access this resource");
        }
        Optional<String> structure = tokenHelper.getOrganisationelStructureFromToken(authToken.get());
        if (!structure.isPresent()) {
            throw new UserNotAuthorizedException("user not affected to structure");
        }

        Optional<Agency> agency = organisationalStructureComponent.getAgency(structure.get());
        if (!agency.isPresent()) {
            throw new UserNotAuthorizedException("user not affected to agency");
        }

        District district = districtDtoDistrictMapper.districtAddDtoToDistrict(districtAddDto);

        district.setAgency(agency.get());
        district.setCode( agency.get().getCode() + district.getCode());

        return districtDtoDistrictMapper.districtToDistrictShowDto(districtComponent.saveDistrict(district));
    }

    @PutMapping(value = "/districtsList/{code}")
    @ApiOperation(value = "Update districts")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully update districts"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public DistrictShowDto updateDistrict(@Valid @RequestBody DistrictEditDto districtEditDto, @PathVariable String code,HttpServletRequest httpServletRequest) {
        Optional<District> district = districtComponent.getDistrictByCode(code);
        if (!district.isPresent()) {
            throw new ResourceNotFoundException(String.format("Resource with {ID %s} not found", code));
        }
        Optional<String> authToken = tokenHelper.getToken(httpServletRequest);
        if (!authToken.isPresent()) {
            throw new UserNotAuthorizedException("Full authentication is required to access this resource");
        }
        Optional<String> structure = tokenHelper.getOrganisationelStructureFromToken(authToken.get());
        if (!structure.isPresent()) {
            throw new UserNotAuthorizedException("user not affected to structure");
        }

        Optional<Agency> agency = organisationalStructureComponent.getAgency(structure.get());
        if (!agency.isPresent()) {
            throw new UserNotAuthorizedException("user not affected to agency");
        }
        District districtToBeUpdated = district.get();

        districtDtoDistrictMapper.districtEditDtoToDistrictWithTarget(districtEditDto, districtToBeUpdated);

        agency.ifPresent(districtToBeUpdated::setAgency);
        districtToBeUpdated.setCode( agency.get().getCode() + districtToBeUpdated.getCode());
        return districtDtoDistrictMapper.districtToDistrictShowDto(districtComponent.updateDistrict(districtToBeUpdated));
    }

    @DeleteMapping(value = "/districtsList")
    @ApiOperation(value = "Delete districts")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of available districts"),
            @ApiResponse(code = 401, message = "You are not authorized to get the list of districts"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "Not district found")
    })
    public ResponseEntity<?> delete(@RequestBody List<String> districts) {
        if (districts.isEmpty()) {
            throw new WrongFormatException("districts list selected is Empty");
        }
        return ResponseEntity.ok(districtComponent.deleteDistricts(districts));
    }
}
