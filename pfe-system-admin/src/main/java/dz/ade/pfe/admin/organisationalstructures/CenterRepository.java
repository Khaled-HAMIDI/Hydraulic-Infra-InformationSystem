package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.Center;

import java.util.List;
import java.util.Optional;

interface CenterRepository {

    List<Center> findAllByDeleted(Boolean deleted);

    Optional<Center> findOneByDeletedAndCode(Boolean deleted, String code);

    Optional<Center> findByCodeAndDeleted(String code, Boolean deleted);

    Center save(Center center);

    int delete(List<String> centers);
    List<Center> findByUnitCode(String code);
    List<Center> findByCode(String code);
}
