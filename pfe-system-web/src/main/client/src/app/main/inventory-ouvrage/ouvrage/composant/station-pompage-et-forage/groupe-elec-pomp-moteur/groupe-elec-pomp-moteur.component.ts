import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-groupe-elec-pomp-moteur',
  templateUrl: './groupe-elec-pomp-moteur.component.html',
  styleUrls: ['./groupe-elec-pomp-moteur.component.scss'],
    animations: fuseAnimations
})
export class GroupeElecPompMoteurComponent implements OnInit{

    grouprElecPMForm: FormGroup;

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
            typeComposant:['GroupeElecPompe-Moteur'],
            nbService: ['',Validators.required],
            nbSecours: ['',Validators.required],
            puissance:['',Validators.required],
            marque: ['',Validators.required],
            operatingDate: ['' ,Validators.required],
            type:['',Validators.required],
            tensionAlimentation:['',Validators.required],
            intensite: ['',Validators.required],
            modeDemarrage: ['',Validators.required],
            state:['',Validators.required],
            speed:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.grouprElecPMForm = this.createForm();
    }

    onSave(): void {

        const moteur = this.grouprElecPMForm.getRawValue();

        this.composantService.saveMoteur(moteur)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }




}
