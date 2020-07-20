package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

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

    private String dimension;

    private String arrangement;

    private double number;

    private String state;

}
