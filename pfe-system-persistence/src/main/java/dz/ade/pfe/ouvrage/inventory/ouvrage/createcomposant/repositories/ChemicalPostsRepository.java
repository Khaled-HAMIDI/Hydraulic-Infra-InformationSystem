package dz.ade.pfe.ouvrage.inventory.ouvrage.createcomposant.repositories;

import dz.ade.pfe.domain.ouvrage.ChemicalPosts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChemicalPostsRepository extends JpaRepository<ChemicalPosts, Long> {
}
