package dz.ade.pfe.domain.commons;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EnumObject<T extends Enum> {

    private String code;
    private String displayValue;
    private T enumValue;
}
