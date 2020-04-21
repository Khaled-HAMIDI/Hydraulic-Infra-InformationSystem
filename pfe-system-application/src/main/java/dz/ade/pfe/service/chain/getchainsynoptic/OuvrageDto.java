package dz.ade.pfe.service.chain.getchainsynoptic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OuvrageDto {
    private String code;
    private String name;
    private Integer position;
}
