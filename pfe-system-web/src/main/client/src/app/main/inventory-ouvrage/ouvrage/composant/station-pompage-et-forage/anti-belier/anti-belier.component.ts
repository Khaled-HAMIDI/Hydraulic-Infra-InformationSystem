import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-anti-belier',
  templateUrl: './anti-belier.component.html',
  styleUrls: ['./anti-belier.component.scss'],
    animations: fuseAnimations
})
export class AntiBelierComponent implements OnInit{

    antiBelierForm: FormGroup;

    constructor(
        private composantService : ComposantService,
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
            typeComposant:['AntiBelier'],
            marque:['',Validators.required],
            type: ['',Validators.required],
            capacity:['',Validators.required],
            compresseur:[true ,Validators.required],
            presseionService:['',Validators.required],
            presseionEpreuve:['',Validators.required],
            presseionRegonflage: ['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.antiBelierForm = this.createForm();
    }

    onSave(): void {

        const antiBelier = this.antiBelierForm.getRawValue();

        this.composantService.saveAntiBelier(antiBelier)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
