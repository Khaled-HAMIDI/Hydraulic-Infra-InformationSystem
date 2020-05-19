package dz.ade.pfe.domain.admin;

import dz.ade.pfe.domain.commons.Auditing;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "authority", schema = "pfe")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"roles"}, callSuper = false)
@Getter
@Setter
@Builder
public class Authority extends Auditing implements GrantedAuthority {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authority_gen")
    @SequenceGenerator(name = "authority_gen", sequenceName = "authority_seq", schema = "pfe", allocationSize = 1)
    Long id;

    @Column(name = "authority", unique = true)
    String authority;

    @Column(name = "description")
    String description;

    @Column(name = "domain")
    String domain;

    @ManyToMany(mappedBy = "authorities")
    @Builder.Default
    private Set<Role> roles = new LinkedHashSet<>();

    public void addRole(Role role) {
        roles.add(role);
        role.getAuthorities().add(this);
    }

    public void removeRole(Role role) {
        roles.remove(role);
        role.getAuthorities().remove(this);
    }
}
