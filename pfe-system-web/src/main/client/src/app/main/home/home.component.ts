import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import includes from 'lodash/includes';
import { fuseAnimations } from '@fuse/animations';
import { ViewEncapsulation } from '@angular/core';
import { HomeService } from './home.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import sortBy from 'lodash/sortBy';

@Component({
    selector: 'fuse-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HomeComponent implements OnInit {
    private _unsubscribeAll: Subject<any>;
    widgets: any;
    widget1SelectedYear = '2016';
    widget5SelectedDay = 'today';
    types:any;
    nbOuvrages
    nbOuvrage;
    nbReleve;
    constructor(private fuseTranslationLoader: FuseTranslationLoaderService,
        private _analyticsDashboardService: HomeService,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) {
        const userRoles = authenticationService.getRoles();

        // if (includes(userRoles, "responsable commercial"))
        //     this.router.navigate(['dashboard/customerservicedashboards']);
        // else if (includes(userRoles, "responsable facturation"))
        //     this.router.navigate(['dashboard/meterreading-invoicing']);

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this._registerCustomChartJSPlugin();
    }

    ngOnInit(): void {
        // Get the widgets from the service    
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[4])
                this.types = response.data[1];
                this.nbOuvrage = response.data[0].splice(response.data[0].length-1,1)
                this.nbReleve = response.data[2].splice(response.data[2].length-1,1)
                this.types = sortBy(this.types,["name"])
                this.nbOuvrages = sortBy(response.data[0],['0'])
                this.widgets = this._analyticsDashboardService.widgets;
                this.setReadingNumbers(response.data[2])
                this.setAvailability(response.data[3],response.data[4])
                this.setSNCUse(response.data[5])
            },
            (error) => {
                console.log(error);
            }
        );
    }
    setSNCUse(taux,data?){
        let days = ['sam','dim','lun','mar','mer','jeu','ven']
        let date;
        this.widgets.widget4.visits.value = (taux*100).toFixed(1)
        this.widgets.widget4.datasets[0].data = [];
        this.widgets.widget4.labels = [];
    }

    setAvailability(taux,data?){
        let days = ['sam','dim','lun','mar','mer','jeu','ven']
        let date;
        this.widgets.widget3.impressions.value = (taux*100).toFixed(1)
        this.widgets.widget3.datasets[0].data = [];
        this.widgets.widget3.labels = [];
        data.forEach((row)=>{
            this.widgets.widget3.datasets[0].data.push(row[1])
            date = new Date(row[0])
            this.widgets.widget3.labels.push(days[date.getDay()]+' '+date.getDate())
        })
    }

    setReadingNumbers(data : Array<any>){
        let days = ['sam','dim','lun','mar','mer','jeu','ven']
        let date : Date
        this.widgets.widget2.datasets[0].data = [];
        this.widgets.widget2.labels = [];
        this.widgets.widget2.conversion.value = ((this.nbReleve*100) /(this.nbOuvrage*data.length)).toFixed(1);
        data.forEach((row)=>{
            this.widgets.widget2.datasets[0].data.push(row[1])
            date = new Date(row[0])
            this.widgets.widget2.labels.push(days[date.getDay()]+' '+date.getDate())
        })
    }

    private _registerCustomChartJSPlugin(): void {
        (window as any).Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing): any {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                ) {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i): any {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index): any {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (window as any).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }

}
