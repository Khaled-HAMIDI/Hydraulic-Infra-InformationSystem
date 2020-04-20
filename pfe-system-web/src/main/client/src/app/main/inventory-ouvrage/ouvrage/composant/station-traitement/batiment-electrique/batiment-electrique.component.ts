import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-batiment-electrique',
  templateUrl: './batiment-electrique.component.html',
  styleUrls: ['./batiment-electrique.component.scss'],
    animations: fuseAnimations
})
export class BatimentElectriqueComponent implements OnInit{

    batimentElectForm: FormGroup;

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
            typeComposant:['BatimentElectrique'],
            area: ['',Validators.required],
            state: ['',Validators.required],
            nature: ['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.batimentElectForm = this.createForm();
    }

    onSave(): void {

        const batiment = this.batimentElectForm.getRawValue();

        this.composantService.saveBatimentElectrique(batiment)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }

}
