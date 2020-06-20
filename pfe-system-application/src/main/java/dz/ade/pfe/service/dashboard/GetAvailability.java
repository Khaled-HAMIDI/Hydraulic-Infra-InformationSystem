package dz.ade.pfe.service.dashboard;

import dz.ade.pfe.port.out.exploitation.availability.LoadAvailability;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAvailability implements dz.ade.pfe.port.in.exploitation.GetAvailability {
    private final LoadAvailability loadAvailability;
    @Override
    public Object getAvailability() {
        return loadAvailability.loadAvailability();
    }

    @Override
    public List<Object> loadAvailabilityDays() {
        return loadAvailability.loadAvailabilityDays();
    }

    @Override
    public Object loadSNCUse() {
        return loadAvailability.loadSNCUse();
    }
}
