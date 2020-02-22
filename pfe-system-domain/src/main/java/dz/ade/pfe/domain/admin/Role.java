package dz.ade.pfe.domain.admin;

import dz.ade.pfe.domain.commons.Auditing;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "role", schema = "pfe", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"role", "deleted", "deleted_date"})
})
@Getter
@Setter
@EqualsAndHashCode(exclude = {"users", "authorities"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role extends Auditing {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_gen")
    @SequenceGenerator(name = "role_gen", sequenceName = "role_seq", schema = "pfe", allocationSize = 1)
    Long id;

    @Column(name = "role")
    String role;

    @Column(name = "designation")
    String designation;

    @Column(name = "deleted")
    @Builder.Default
    private boolean deleted = false;

    @Column(name = "system_entity")
    @Builder.Default
    private Boolean systemEntity = false;

    @Column(name = "deleted_date", columnDefinition = "TIMESTAMP")
    @Builder.Default
    protected LocalDateTime deletedDate = LocalDateTime.of(0, 1, 1, 0, 0);

    @ManyToMany(mappedBy = "roles")
    @Builder.Default
    private Set<User> users = new LinkedHashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "role_authority", schema = "pfe",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
    @Builder.Default
    private Set<Authority> authorities = new LinkedHashSet<>();

    public void addAuthority(Authority authority) {
        authorities.add(authority);
        authority.getRoles().add(this);
    }

    public void removeAuthority(Authority authority) {
        authorities.remove(authority);
        authority.getRoles().remove(this);
    }
}
