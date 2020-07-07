package dz.ade.pfe.web.ouvrage.inventory.chain;

import dz.ade.pfe.port.in.chain.getchainlist.GetChainListQuery;
import dz.ade.pfe.service.chain.getchainlist.ChainListDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Chains", description = "Obtenir la list des ouvrages")
@Component
@RequiredArgsConstructor
public class GetChainListController {
    private final GetChainListQuery getChainListQuery;

    @GetMapping(value = "/chains")
    @ApiOperation(value = "View a list of available chains")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of commune by wilaya"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<ChainListDto> getChainList() {
        return getChainListQuery.getChainList();
    }

}
