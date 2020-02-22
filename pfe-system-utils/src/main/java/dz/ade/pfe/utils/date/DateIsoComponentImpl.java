package dz.ade.pfe.utils.date;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/13/2018
 */
@Component
class DateIsoComponentImpl implements DateIsoComponent {

    @Override
    public String Date(Date date) {
        SimpleDateFormat formatIso = new SimpleDateFormat("yyyy-MM-dd");
        return formatIso.format(date);
    }

    @Override
    public String DateTime(Date date) {
        SimpleDateFormat formatIso = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return formatIso.format(date);
    }
}
