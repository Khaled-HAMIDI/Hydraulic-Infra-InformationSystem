package dz.ade.pfe.web.commons.street.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StreetAddDto {
    private String id;
    @Pattern(regexp="^[a-zA-Z0-9]{3}",message="length must be 3")
    @NotBlank
    private String code;
    @NotBlank
    private String designation;
    @NotBlank
    private String district;
}
