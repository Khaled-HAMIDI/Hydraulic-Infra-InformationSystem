package dz.ade.pfe.web.admin.organisationalstructure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgencyCreateDto {
    @Pattern(regexp="^[a-zA-Z0-9]{2}",message="length must be 2")
    @NotBlank
    private String code;
    @NotBlank
    private String agencyType;
    @NotBlank
    private String address;
    @NotNull
    private Double latitude;
    @NotNull
    private Double longitude;
    @NotBlank
    private String designation;
    @NotBlank
    private String phone;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String center;

    @NotBlank
    private String businessRegisterNumber;
    @NotBlank
    private String fax;
    @NotBlank
    private String bankOfDomiciliation;
    @NotBlank
    private String agency;
    @NotBlank
    private String rib;
    @NotBlank
    private String rip;
    @NotBlank
    private String taxIdNumber;
    @NotBlank
    private String taxIdentificationNumber;
    @NotBlank
    private String thirdPartyCode;
}