package dz.ade.pfe.web.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.port.in.chain.createchain.CreateChainCommand;
import dz.ade.pfe.service.chain.createchain.ChainSaveDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Chains", description = "Ajouter une nouvelle chain")
@Component
@RequiredArgsConstructor
public class CreateChainController {
    private final CreateChainCommand createChainCommand;
    @PostMapping(value = "/chain")
    @ApiOperation(value = "Add new chain")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully created a chain"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public Chain createChain(@Valid @RequestBody ChainSaveDto chain) {
       return createChainCommand.createChain(chain);
    }
}
