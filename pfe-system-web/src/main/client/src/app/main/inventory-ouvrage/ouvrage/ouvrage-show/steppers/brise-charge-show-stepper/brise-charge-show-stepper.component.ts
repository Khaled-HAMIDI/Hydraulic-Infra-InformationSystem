import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-brise-charge-show-stepper',
  templateUrl: './brise-charge-show-stepper.component.html',
  styleUrls: ['./brise-charge-show-stepper.component.scss'],
    animations: fuseAnimations
})
export class BriseChargeShowStepperComponent {
    constructor(
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }
}
