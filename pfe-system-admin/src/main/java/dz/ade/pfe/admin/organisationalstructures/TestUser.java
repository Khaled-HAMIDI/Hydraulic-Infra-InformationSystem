package dz.ade.pfe.admin.organisationalstructures;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestUser {
    private String code;
    private long readerCount;
}
