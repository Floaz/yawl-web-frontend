
import { DateAdapter, NativeDateAdapter } from '@angular/material';




const SUPPORTS_INTL_API = typeof Intl !== 'undefined';


export class MyDateAdapter extends NativeDateAdapter {

    useUtcForDisplay = true;
    
    constructor() {
        super('de');
    }

    getFirstDayOfWeek(): number {
        return 1;
    }
    

    parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('.') > -1)) {
            const str = value.split('.');

            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);
            let tmzo = new Date(year, month, date).getTimezoneOffset();
            tmzo = tmzo <= 0 ? 0 : 1;

            return new Date(Date.UTC(year, month, date + tmzo));
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
    
    createDate(year: number, month: number, date: number): Date {
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }

        const result = this._customCreateDateWithOverflow(year, month, date);

        return result;
    }

    private _customCreateDateWithOverflow(year: number, month: number, date: number): Date {
        // doing this you avoid trouble with Daylight Saving Time
        let tmzo = new Date(year, month, date).getTimezoneOffset();
        tmzo = tmzo <= 0 ? 0 : 1;
        const result = new Date(Date.UTC(year, month, date + tmzo));

        // We need to correct for the fact that JS native Date treats years
        // in range [0, 99] as abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }

        return result;
    }


    format(d: Date, displayFormat: Object): string {
        return ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." +d.getFullYear();
    }
}
