package dz.ade.pfe.domain.admin;

import dz.ade.pfe.domain.commons.Auditing;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @author kabouche
 * @version 1.0
 * @created 7/22/2018
 */

@Entity
@Table(name = "organisational_structure", schema = "pfe",
        uniqueConstraints = {
                @UniqueConstraint(name = "head_of_the_structure_id_constrainte", columnNames = {"head_of_the_structure_id"}),
                @UniqueConstraint(columnNames = {"code", "deleted", "deleted_date"})})
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "structure_type")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"headOfTheStructure", "users"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class OrganisationalStructure extends Auditing {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "organisational_structure_gen")
    @SequenceGenerator(name = "organisational_structure_gen", sequenceName = "organisational_structure_seq",
            schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code")
    protected String code;

    @Column(name = "designation")
    protected String designation;

    @Column(name = "phone")
    protected String phone;

    @Column(name = "email")
    protected String email;

    @Column(name = "address")
    protected String address;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "enabled")
    @Builder.Default
    protected boolean enabled = true;

    @Column(name = "business_register_number", unique = true)
    private String businessRegisterNumber;

    @Column(name = "fax")
    protected String fax;

    @Column(name = "bank_of_domiciliation")
    protected String bankOfDomiciliation;

    @Column(name = "agency")
    protected String agency;

    @Column(name = "rib")
    protected String rib;

    @Column(name = "rip")
    protected String rip;

    @Column(name = "tax_id_number")
    protected String taxIdNumber;

    @Column(name = "tax_identification_number")
    protected String taxIdentificationNumber;

    @Column(name = "third_party_code")
    protected String thirdPartyCode;

    @Column(name = "epeor_code")
    protected String epeorCode;

    @Column(name = "deleted")
    @Builder.Default
    protected boolean deleted = false;

    @Column(name = "deleted_date", columnDefinition = "TIMESTAMP")
    @Builder.Default
    protected LocalDateTime deletedDate = LocalDateTime.of(0, 1, 1, 0, 0);

    @Column(name = "structure_type", insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    protected StructureType structureType;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "head_of_the_structure_id")
    protected User headOfTheStructure;

    @OneToMany(mappedBy = "organisationalStructure", cascade = CascadeType.ALL)
    @Builder.Default
    protected List<User> users = new ArrayList<>();

    public void addUser(User user) {
        users.add(user);
        user.setOrganisationalStructure(this);
    }

    public void removeUser(User user) {
        users.remove(user);
        user.setOrganisationalStructure(null);
    }
}
