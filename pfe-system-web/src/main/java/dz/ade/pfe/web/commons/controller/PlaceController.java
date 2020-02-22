package dz.ade.pfe.web.commons.controller;
import dz.ade.pfe.commons.commune.CommuneComponent;
import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.web.commons.dto.WilayaDto;
import dz.ade.pfe.web.commons.mapper.PlaceDtoPlaceMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api")
@Api(value = "wilaya", description = "Operations on wilayas")
public class PlaceController {

    private CommuneComponent communeComponent;
    private PlaceDtoPlaceMapper placeDtoPlaceMapper;

    public PlaceController(CommuneComponent communeComponent,
                           PlaceDtoPlaceMapper placeDtoPlaceMapper) {
        this.communeComponent = communeComponent;
        this.placeDtoPlaceMapper = placeDtoPlaceMapper;
    }

    @GetMapping(value = "/wilayas")
    @ApiOperation(value = "View a list of available wilayas")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of wilayas"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<WilayaDto> getAllWilaya() {
        List<WilayaDto> wilayas = communeComponent.getAllWilaya()
                .stream()
                .map(wilaya -> placeDtoPlaceMapper.wilayaToWilayaDto(wilaya))
                .collect(Collectors.toList());
        return wilayas;
    }

    @GetMapping(value = "/communes/{code}")
    @ApiOperation(value = "View a list of available commune")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of commune"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<?> getCommuneByWilaya(@PathVariable String code) {

        List<Commune> communes = communeComponent.getCommuneByWilaya(code);
        if (communes == null) {
            throw new ResourceNotFoundException(String.format("Resource with {ID %s} not found", code));
        }
        return ResponseEntity.ok(placeDtoPlaceMapper.communeToCommuneDto(communes));
    }
}
