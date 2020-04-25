package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ProductStorage extends Component {

    @Column(name = "type_ProductStorage")
    private String type;

    @Column(name = "form_ProductStorage")
    private String form;

    @Column(name = "dimention_ProductStorage")
    private String dimention;

    @Column(name = "arrangement_ProductStorage")
    private String arrangement;

    @Column(name = "number_ProductStorage")
    private double number;

    @Column(name = "state_ProductStorage")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
