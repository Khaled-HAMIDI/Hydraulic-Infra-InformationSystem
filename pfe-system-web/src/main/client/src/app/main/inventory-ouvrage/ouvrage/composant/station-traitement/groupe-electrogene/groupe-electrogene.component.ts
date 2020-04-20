import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-groupe-electrogene',
  templateUrl: './groupe-electrogene.component.html',
  styleUrls: ['./groupe-electrogene.component.scss'],
    animations: fuseAnimations
})
export class GroupeElectrogeneComponent implements OnInit{

    groupeElectrogeneForm: FormGroup;

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
            typeComposant:['GroupeElectrogene'],
            puissance: ['',Validators.required],
            cuve: ['',Validators.required],
            number:['',Validators.required],
            nature: ['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.groupeElectrogeneForm = this.createForm();
    }

    onSave(): void {

        const groupe = this.groupeElectrogeneForm.getRawValue();

        this.composantService.saveGroupeElectrogene(groupe)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
