package dz.ade.pfe.web.admin.organisationalstructure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgencyShowDto {
	private String id;
	private String code;
	private AgencyTypeDto agencyType;
	private String address;
	private String designation;
	private String phone;
	private String email;
	private Double latitude;
	private Double longitude;
	private CenterDto center;
	private UserDto headOfTheStructure;

	private String businessRegisterNumber;
	private String fax;
	private String bankOfDomiciliation;
	private String agency;
	private String rib;
	private String rip;
	private String taxIdNumber;
	private String taxIdentificationNumber;
	private String thirdPartyCode;
}
