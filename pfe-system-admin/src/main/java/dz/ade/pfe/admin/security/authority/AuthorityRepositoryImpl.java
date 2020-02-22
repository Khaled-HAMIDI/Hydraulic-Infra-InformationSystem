package dz.ade.pfe.admin.security.authority;

import dz.ade.pfe.domain.admin.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

interface AuthorityRepositoryImpl extends AuthorityRepository, JpaRepository<Authority, Long> {

    List<Authority> findAll();

    @Query("SELECT authority FROM Authority authority WHERE authority.authority IN :authorities")
    Set<Authority> finAllAuthorities(@Param("authorities") List<String> authorities);

    Optional<Authority> findOneByAuthority(String authority);
}
