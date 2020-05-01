import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-station-non-conv-show-stepper',
  templateUrl: './station-non-conv-show-stepper.component.html',
  styleUrls: ['./station-non-conv-show-stepper.component.scss'],
    animations: fuseAnimations
})
export class StationNonConvShowStepperComponent {
    constructor(
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }
}
