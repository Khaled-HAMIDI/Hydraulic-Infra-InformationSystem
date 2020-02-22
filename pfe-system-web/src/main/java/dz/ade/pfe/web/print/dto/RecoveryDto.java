package dz.ade.pfe.web.print.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecoveryDto {

    List<String> items;
    String step;
}
