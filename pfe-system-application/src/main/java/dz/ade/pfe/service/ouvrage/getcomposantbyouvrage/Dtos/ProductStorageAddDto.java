package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductStorageAddDto {

    private String typeComposant;

    private Double cost;

    private String type;

    private String form;

    private String dimention;

    private String arrangement;

    private double number;

    private String state;

}
