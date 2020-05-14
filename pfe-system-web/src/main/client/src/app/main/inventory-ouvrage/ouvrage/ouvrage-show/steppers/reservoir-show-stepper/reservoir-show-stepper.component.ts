import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservoir-show-stepper',
  templateUrl: './reservoir-show-stepper.component.html',
  styleUrls: ['./reservoir-show-stepper.component.scss'],
    animations: fuseAnimations
})
export class ReservoirShowStepperComponent {
    constructor(
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }
}
