import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';

@Component({
  selector: 'app-prise-eau',
  templateUrl: './prise-eau.component.html',
  styleUrls: ['./prise-eau.component.scss'],
    animations: fuseAnimations
})
export class PriseEauComponent implements OnInit{

    priseEauForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router :Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.initForm();

    }


    createForm(): FormGroup {
        let obj = {
            type: ['',Validators.required],
            dimension: ['',Validators.required],
            nature:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.priseEauForm = this.createForm();
    }


}
