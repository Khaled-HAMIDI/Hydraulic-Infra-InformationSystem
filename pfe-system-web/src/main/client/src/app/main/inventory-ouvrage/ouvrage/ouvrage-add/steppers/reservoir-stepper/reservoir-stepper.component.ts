import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { fuseAnimations } from '@fuse/animations';
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-reservoir-stepper',
  templateUrl: './reservoir-stepper.component.html',
  styleUrls: ['./reservoir-stepper.component.scss'],
    animations: fuseAnimations,
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
    }]
})
export class ReservoirStepperComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    pageType:string;

    constructor(
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.pageType=response.action;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
