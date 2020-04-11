package dz.ade.pfe.service.chain.getchaindetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChainDto {
    private String id;

    private String name;

    private Integer ouvragesNumber;
}
