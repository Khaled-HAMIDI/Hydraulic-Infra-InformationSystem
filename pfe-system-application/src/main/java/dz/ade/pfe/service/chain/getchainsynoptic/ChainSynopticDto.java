package dz.ade.pfe.service.chain.getchainsynoptic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChainSynopticDto {
    private String code;

    private String name;

    private List<OuvrageDto> ouvrages;
}
