package dz.ade.pfe.service.chain.getchaindetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChainDto {
    private String id;

    private String code;

    private String name;

    private List<OuvrageDto> ouvrages;
}
