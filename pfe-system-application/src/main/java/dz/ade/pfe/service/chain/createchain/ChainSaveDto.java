package dz.ade.pfe.service.chain.createchain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChainSaveDto {
    @NotBlank
    private String code;
    @NotBlank
    private String name;
    private List<String> ouvrages;
}
