import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-forage-show-stepper',
  templateUrl: './forage-show-stepper.component.html',
  styleUrls: ['./forage-show-stepper.component.scss'],
    animations: fuseAnimations
})
export class ForageShowStepperComponent {
    constructor(
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }
}
