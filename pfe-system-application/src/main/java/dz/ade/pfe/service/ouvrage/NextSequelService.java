package dz.ade.pfe.service.ouvrage;

import dz.ade.pfe.port.in.GetSequelNumber;
import dz.ade.pfe.port.out.LoadSequelNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NextSequelService implements GetSequelNumber {
    private final LoadSequelNumber loadSequelNumber;
    @Override
    public Integer getNext(String type, String code) {
        return loadSequelNumber.getNext(type,code);
    }
}
