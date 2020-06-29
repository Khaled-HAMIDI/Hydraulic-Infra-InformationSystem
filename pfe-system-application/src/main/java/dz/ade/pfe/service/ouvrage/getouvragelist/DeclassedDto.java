package dz.ade.pfe.service.ouvrage.getouvragelist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeclassedDto {
    private String id;

    private String code;

    private String name;

    private String type;

    private LocalDate operatingDate;

    private LocalDate commissioningDate;

    private LocalDateTime declassedDate;
}
