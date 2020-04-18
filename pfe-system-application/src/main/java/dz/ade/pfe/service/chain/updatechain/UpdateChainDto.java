package dz.ade.pfe.service.chain.updatechain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateChainDto {
    @NotBlank
    private String code;
    @NotBlank
    private String name;
    private List<String> ouvrages;
}
