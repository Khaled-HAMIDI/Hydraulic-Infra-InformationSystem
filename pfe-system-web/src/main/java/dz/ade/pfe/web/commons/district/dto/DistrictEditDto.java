package dz.ade.pfe.web.commons.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DistrictEditDto {
    private String id;
    @Pattern(regexp="^[a-zA-Z0-9]{1}",message="length must be 1")
    @NotBlank
    private String code;
    @NotBlank
    private String designation;
    @NotBlank
    private String agency;
}
