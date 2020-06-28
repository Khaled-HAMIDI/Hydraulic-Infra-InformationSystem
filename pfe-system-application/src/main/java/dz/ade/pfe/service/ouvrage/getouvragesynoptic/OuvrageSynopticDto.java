package dz.ade.pfe.service.ouvrage.getouvragesynoptic;

import dz.ade.pfe.domain.ouvrage.OuvrageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OuvrageSynopticDto {
    private String code;
    private OuvrageType type;
    private String name;
    private SiteDto site;
    private Double currentDebit;
    private Integer nbApears;
    private Boolean enabled;
}
