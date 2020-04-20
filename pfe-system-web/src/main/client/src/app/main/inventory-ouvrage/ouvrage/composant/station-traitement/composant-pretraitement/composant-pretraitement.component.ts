import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";


@Component({
  selector: 'app-composant-pretraitement',
  templateUrl: './composant-pretraitement.component.html',
  styleUrls: ['./composant-pretraitement.component.scss'],
    animations: fuseAnimations
})
export class ComposantPretraitementComponent implements OnInit{

    composantPreTraitForm: FormGroup;

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
            typeComposant:['EquipementStationTraitement'],
            typeEquipement:['Composant de prétraitement'],
            state: ['',Validators.required],
            type: ['',Validators.required],
            form:['',Validators.required],
            capacity: ['',Validators.required],
            enabled: [true ,Validators.required],
            nature:['',Validators.required],
            number:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.composantPreTraitForm = this.createForm();
    }

    onSave(): void {

        const equipement = this.composantPreTraitForm.getRawValue();

        this.composantService.saveEquipementStationTraitement(equipement)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
