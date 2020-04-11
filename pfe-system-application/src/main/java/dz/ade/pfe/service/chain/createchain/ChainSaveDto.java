package dz.ade.pfe.service.chain.createchain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChainSaveDto {
    @NotBlank
    private String id;
    @NotBlank
    private String name;
}
