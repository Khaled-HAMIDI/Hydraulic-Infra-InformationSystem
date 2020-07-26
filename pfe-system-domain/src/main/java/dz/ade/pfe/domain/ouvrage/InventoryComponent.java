package dz.ade.pfe.domain.ouvrage;

import dz.ade.pfe.domain.admin.User;
import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "inventory_component", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryComponent extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventory_component_gen")
    @SequenceGenerator(name = "inventory_component_gen", sequenceName = "inventory_component_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "component_type")
    private String componentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ouvrage_id")
    private Ouvrage ouvrage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_id")
    private Component component;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private State state;

    /* virtuel quantity*/
    @Column(name = "number")
    private Double number;

    /* physic quantity */
    @Column(name = "gap")
    private Double gap;


    @Column(name = "observation")
    private String observation;

    @Column(name = "done")
    private Boolean done;



}
