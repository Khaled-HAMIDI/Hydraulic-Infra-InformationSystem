package dz.ade.pfe.web.admin.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StructureDto {
    private String id;
    private String designation;
    private String type;
    private StructureDto parentStructure;
}
