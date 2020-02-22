package dz.ade.pfe.web.commons.street.controller;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.commons.district.DistrictComponent;
import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.commons.street.StreetComponent;
import dz.ade.pfe.domain.commons.District;
import dz.ade.pfe.domain.commons.Street;
import dz.ade.pfe.domain.exceptions.ResourceAlreadyExistException;
import dz.ade.pfe.domain.exceptions.UserNotAuthorizedException;
import dz.ade.pfe.web.commons.street.dto.*;
import dz.ade.pfe.domain.exceptions.WrongFormatException;
import dz.ade.pfe.web.commons.street.dto.StreetAddDto;
import dz.ade.pfe.web.commons.street.dto.StreetEditDto;
import dz.ade.pfe.web.commons.street.dto.StreetListDto;
import dz.ade.pfe.web.commons.street.dto.StreetShowDto;
import dz.ade.pfe.web.commons.street.mapper.StreetDtoStreetMapper;
import dz.ade.pfe.web.security.auth.TokenHelper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Users", description = "Operations on streets")
public class StreetController {

    private StreetComponent streetComponent;
    private StreetDtoStreetMapper streetDtoStreetMapper;
    private DistrictComponent districtComponent;
    private TokenHelper tokenHelper;
    private OrganisationalStructureComponent organisationalStructureComponent;


    public StreetController(StreetComponent streetComponent,
                            StreetDtoStreetMapper streetDtoStreetMapper,
                            DistrictComponent districtComponent,
                            TokenHelper tokenHelper,
                            OrganisationalStructureComponent organisationalStructureComponent) {
        this.streetComponent = streetComponent;
        this.streetDtoStreetMapper = streetDtoStreetMapper;
        this.districtComponent = districtComponent;
        this.tokenHelper = tokenHelper;
        this.organisationalStructureComponent = organisationalStructureComponent;
    }

    @GetMapping(value = "/streets/{code}")
    @ApiOperation(value = "View a list of available sousActivities")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of streets"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<StreetDto> getStreets(@PathVariable String code) {
        List<Street> streets = streetComponent.getStreetByDistrict(code);
        if (streets == null) {
            throw new ResourceNotFoundException(String.format("Resource with {ID %s} not found", code));
        }

        return streetDtoStreetMapper.streetToStreetDto(streets);
    }

    @GetMapping(value = "/streetsList")
    @ApiOperation(value = "View a list of available streets")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of streets"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<StreetListDto> getStreetsList(HttpServletRequest httpServletRequest) {
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

        List<Street> streets = streetComponent.getListStreetsByStructure(organisationalStructure.get().getCode(),
                organisationalStructure.get().getStructureType());

        return streetDtoStreetMapper.streetToStreetListDto(streets);
    }

    @GetMapping(value = "/streetsList/{code}")
    @ApiOperation(value = "Search for a street with a code")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a street"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public StreetShowDto getStreet(@PathVariable String code) {

        Optional<Street> street = streetComponent.getStreet(code);
        if (!street.isPresent()) {
            throw new ResourceNotFoundException(String.format("Resource with {ID %s} not found", code));
        }

        return streetDtoStreetMapper.streetToStreetShowDto(street.get());
    }

    @PostMapping(value = "/streetsList")
    @ApiOperation(value = "Add a street")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of available streets"),
            @ApiResponse(code = 401, message = "You are not authorized to get the list of streets"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "Not street found")
    })
    public StreetShowDto createDistrict(@Valid @RequestBody StreetAddDto streetAddDto) {
        Optional<Street> streetByCode = streetComponent.getStreet(streetAddDto.getCode());
        if (streetByCode.isPresent()) {
            throw new ResourceAlreadyExistException(String.format("There is already a street with given code %s", streetAddDto.getCode()));
        }

        Optional<District> district = districtComponent.getDistrictByCode(streetAddDto.getDistrict());
        if (!district.isPresent()) {
            throw new ResourceNotFoundException(String.format("district with {Code %s} not found", streetAddDto.getDistrict()));
        }

        Street street = streetDtoStreetMapper.streetAddDtoToStreet(streetAddDto);
        street.setCode(district.get().getCode() + street.getCode());
        street.setDistrict(district.get());

        return streetDtoStreetMapper.streetToStreetShowDto(streetComponent.saveStreet(street));
    }

    @PutMapping(value = "/streetsList/{code}")
    @ApiOperation(value = "Update streets")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully update streets"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public StreetShowDto updateStreet(@Valid @RequestBody StreetEditDto streetEditDto, @PathVariable String code) {
        Optional<Street> street = streetComponent.getStreet(code);
        if (!street.isPresent()) {
            throw new ResourceNotFoundException(String.format("Resource with {ID %s} not found", code));
        }

        Optional<District> district = districtComponent.getDistrictByCode(streetEditDto.getDistrict());
        if (!district.isPresent()) {
            throw new ResourceNotFoundException(String.format("district with {Code %s} not found", streetEditDto.getDistrict()));
        }

        Street streetToBeUpdated = street.get();
        streetDtoStreetMapper.streetEditDtoToStreetWithTarget(streetEditDto, streetToBeUpdated);
        district.ifPresent(streetToBeUpdated::setDistrict);
        streetToBeUpdated.setCode(district.get().getCode() + streetToBeUpdated.getCode());
        return streetDtoStreetMapper.streetToStreetShowDto(streetComponent.updateStreet(streetToBeUpdated));
    }

    @DeleteMapping(value = "/streetsList")
    @ApiOperation(value = "Delete streets")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of available streets"),
            @ApiResponse(code = 401, message = "You are not authorized to get the list of streets"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "Not street found")
    })
    public int delete(@RequestBody List<String> streets) {
        if (streets.isEmpty()) {
            throw new WrongFormatException("streets list selected is Empty");
        }

        return streetComponent.deleteStreets(streets);
    }
}
