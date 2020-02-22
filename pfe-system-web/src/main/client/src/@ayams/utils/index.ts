import { MatDateFormats } from "@angular/material/core";
import { ToolsService } from '@ayams/services/tools.service';

export const FR_DATE_FORMAT: MatDateFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
    }
};

export class IndexError {

    public static getIndexMsgError(pastIndex: number, currentIndex: number, averageConsumption: number, translate: ToolsService): string {
        const msg = this.getIndextypeError(pastIndex, currentIndex, averageConsumption);

        return msg ? translate.getTranslation('INDEX.' + msg) : null;
    }

    public static getIndextypeError(pastIndex: number, currentIndex: number, averageConsumption: number): string {
        if (pastIndex > currentIndex) return 'negative-consumption';
        if (pastIndex == currentIndex) return 'no-consumption';
        if ((2 * averageConsumption) < (currentIndex - pastIndex)) return 'high-consumption';
        if ((averageConsumption / 2) > (currentIndex - pastIndex)) return 'low-consumption';
        return null;
    }
}