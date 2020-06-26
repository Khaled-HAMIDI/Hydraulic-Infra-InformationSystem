package dz.ade.pfe.domain.admin;

import dz.ade.pfe.domain.commons.Auditing;
import dz.ade.pfe.domain.ouvrage.ExploitationUser;
import dz.ade.pfe.domain.ouvrage.Inventory;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "user", schema = "pfe", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username", "deleted", "deleted_date"}),
        @UniqueConstraint(columnNames = {"employee_code", "deleted", "deleted_date"})
})
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"organisationalStructure", "roles"}, callSuper = false)
@Getter
@Setter
@Builder
public class User extends Auditing implements UserDetails {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_gen")
    @SequenceGenerator(name = "user_gen", sequenceName = "user_seq", schema = "pfe", allocationSize = 1)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "employee_code")
    private String employeeCode;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "enabled")
    @Builder.Default
    private boolean enabled = true;

    @Column(name = "deleted")
    @Builder.Default
    private boolean deleted = false;

    @Column(name = "deleted_date", columnDefinition = "TIMESTAMP")
    @Builder.Default
    protected LocalDateTime deletedDate = LocalDateTime.of(0, 1, 1, 0, 0);

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organisational_structure_id")
    private OrganisationalStructure organisationalStructure;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<ExploitationUser> ouvrages = new ArrayList<>();

    @OneToMany(mappedBy = "headOfTheInventory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<Inventory> inventories = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "user_role", schema = "pfe",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    @Builder.Default
    private Set<Role> roles = new LinkedHashSet<>();

    public void addRole(Role role) {
        roles.add(role);
        role.getUsers().add(this);
    }

    public void removeRole(Role role) {
        roles.remove(role);
        role.getUsers().remove(this);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new ArrayList<>(role.getAuthorities()))
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}
