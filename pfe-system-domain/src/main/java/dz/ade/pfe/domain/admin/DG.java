package dz.ade.pfe.domain.admin;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.TypeDef;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "dg", schema = "pfe")
@DiscriminatorValue("DG")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"centers"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class DG   extends OrganisationalStructure{
    @Column(name = "is_deployed")
    protected Boolean isDeployed;
}
