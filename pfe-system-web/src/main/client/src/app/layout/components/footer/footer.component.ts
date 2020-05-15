import { Component } from '@angular/core';

@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent
{
    date : Date
    year;
    /**
     * Constructor
     */
    constructor()
    {
        this.date = new Date();
        this.year = this.date.getFullYear();
    }
}
