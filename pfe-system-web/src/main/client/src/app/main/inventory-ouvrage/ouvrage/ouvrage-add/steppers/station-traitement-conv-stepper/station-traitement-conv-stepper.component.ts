import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { fuseAnimations } from '@fuse/animations';
import {locale as french} from "../i18n/fr";
import {locale as arabic} from "../i18n/ar";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-station-traitement-conv-stepper',
  templateUrl: './station-traitement-conv-stepper.component.html',
  styleUrls: ['./station-traitement-conv-stepper.component.scss'],
    animations: fuseAnimations,
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
    }]
})
export class StationTraitementConvStepperComponent implements OnInit{

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
