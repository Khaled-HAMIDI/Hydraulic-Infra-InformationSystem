package dz.ade.pfe.web.ouvrage.inventory.chain;

import dz.ade.pfe.port.in.chain.updatechain.UpdateChainQuery;
import dz.ade.pfe.service.chain.getchaindetails.ChainDto;
import dz.ade.pfe.service.chain.updatechain.UpdateChainDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Chains", description = "Obtenir la list des ouvrages")
@Component
@RequiredArgsConstructor
public class UpdateChainController {
    private final UpdateChainQuery updateChainQuery;
    @PutMapping(value = "/chain/{code}")
    @PreAuthorize("hasAuthority('*:*')")
    @ApiOperation(value = "Update user information")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully updated user information"),
            @ApiResponse(code = 401, message = "You are unauthorized to update user information"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The user you are trying to update is not found")
    })
    public ChainDto updateChain(@PathVariable String code,
                                @Valid @RequestBody UpdateChainDto updateChainDto){

        return updateChainQuery.updateChain(updateChainDto);
    }
}
