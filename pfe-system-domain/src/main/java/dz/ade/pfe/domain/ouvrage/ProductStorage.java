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

    @Column(name = "type_product_storage")
    private String type;

    @Column(name = "form_product_storage")
    private String form;

    @Column(name = "dimention_product_storage")
    private String dimention;

    @Column(name = "arrangement_product_storage")
    private String arrangement;

    @Column(name = "number_product_storage")
    private double number;

    @Column(name = "state_product_storage")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
