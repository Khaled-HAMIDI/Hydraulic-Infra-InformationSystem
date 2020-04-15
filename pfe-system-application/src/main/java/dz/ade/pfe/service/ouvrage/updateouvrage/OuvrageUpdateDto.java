package dz.ade.pfe.service.ouvrage.updateouvrage;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OuvrageUpdateDto {

    private boolean enabled;

    private double currentCapacity;

    private Double power;

    private Double pumpDebit;

    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    private Boolean remoteManagement;

    private Boolean specializedLine;

    private Boolean abri;

    private Double energyMonthlyBill;

    private Integer totalWorkforce;

    private Double chemicalMonthlyBill;

    private Double coteTn;

    private Double debitLoadBreaker;

    private Double chargesAmontEtAval;

    private Double currentDebit;

    private Boolean electricAlimentation;

    public boolean getEnabled() {
        return this.enabled;
    }

}
