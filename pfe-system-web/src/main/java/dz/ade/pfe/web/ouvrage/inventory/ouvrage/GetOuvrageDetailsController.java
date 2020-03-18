package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.port.in.getouvragedetails.GetOuvrageDetailsQuery;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@Component
public class GetOuvrageDetailsController {
    private GetOuvrageDetailsQuery getOuvrageDetailsQuery;
}
