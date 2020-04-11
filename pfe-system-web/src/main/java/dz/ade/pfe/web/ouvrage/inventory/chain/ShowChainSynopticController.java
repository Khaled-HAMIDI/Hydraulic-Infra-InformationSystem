package dz.ade.pfe.web.ouvrage.inventory.chain;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Chains", description = "Obtenir la list des ouvrages")
@Component
@RequiredArgsConstructor
public class ShowChainSynopticController {
}
