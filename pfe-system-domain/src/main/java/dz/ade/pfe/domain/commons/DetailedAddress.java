package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode(exclude = {"commune"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class DetailedAddress {

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "door_number")
    private String doorNumber;

    @Column(name = "floor")
    private Integer floor;

    @Column(name = "building_number")
    private String buildingNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "detailed_address")
    private String precisedAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commune_id")
    private Commune commune;

}
