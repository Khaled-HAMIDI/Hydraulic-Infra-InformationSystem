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
public class AgencyTourPlanningDto {
	private String id;
	private String code;
	private String designation;
	private Integer meterReaders = 0;
	private Integer placeOfConsumptions;
}
