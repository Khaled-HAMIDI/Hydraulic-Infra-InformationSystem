import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { fuseAnimations } from '@fuse/animations';
import {locale as french} from "../i18n/fr";
import {locale as arabic} from "../i18n/ar";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Component({
  selector: 'app-station-traitement-conv-stepper',
  templateUrl: './station-traitement-conv-stepper.component.html',
  styleUrls: ['./station-traitement-conv-stepper.component.scss'],
    animations: fuseAnimations,
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
    }]
})
export class StationTraitementConvStepperComponent {
    constructor(
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }
}
