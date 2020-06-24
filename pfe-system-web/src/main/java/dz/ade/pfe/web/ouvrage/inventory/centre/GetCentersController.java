package dz.ade.pfe.web.ouvrage.inventory.centre;

import dz.ade.pfe.domain.admin.Center;
import dz.ade.pfe.web.admin.organisationalstructure.dto.CenterDto;
import dz.ade.pfe.web.admin.organisationalstructure.mapper.CenterDtoCenterMapper;
import dz.ade.pfe.web.commons.controller.BaseController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Centers")
@RequiredArgsConstructor
public class GetCentersController extends BaseController {
    private final CenterDtoCenterMapper centerDtoCenterMapper;

    @GetMapping(value = "/ouvrage/centers")
    @ApiOperation(value = "Save a site")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an inventory"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    List<CenterDto> GetCenters(HttpServletRequest httpServletRequest) {
        LinkedHashMap Structure = securityUtils.getConnectedUserOrganisationalStructure(httpServletRequest);
        String code = securityUtils.getConnectedUserOrganisationalStructureId(httpServletRequest);
        if (Structure.get("type").equals("UNIT")) {
            List<CenterDto> centers = organisationalStructureComponent
                    .getUnitCenters(code).stream()
                    .map(center -> centerDtoCenterMapper.centerToCenterDto(center))
                    .collect(Collectors.toList());
            return centers;
        }
        if (Structure.get("type").equals("CENTER")) {
            List<CenterDto> centers = organisationalStructureComponent
                    .getCenters(code).stream()
                    .map(center -> centerDtoCenterMapper.centerToCenterDto(center))
                    .collect(Collectors.toList());
            return centers;
        }
        return null;
    }
}
