package dz.ade.pfe.utils.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchModel {

    private Integer offset;
    private Integer limit;
    private Sort sort;
    private Specification specification;
}
