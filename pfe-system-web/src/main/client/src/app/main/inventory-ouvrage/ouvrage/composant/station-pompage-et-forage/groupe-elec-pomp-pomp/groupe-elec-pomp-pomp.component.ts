import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-groupe-elec-pomp-pomp',
  templateUrl: './groupe-elec-pomp-pomp.component.html',
  styleUrls: ['./groupe-elec-pomp-pomp.component.scss'],
    animations: fuseAnimations
})
export class GroupeElecPompPompComponent implements OnInit{

    grouprElecPPForm: FormGroup;

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
            typeComposant:['GroupeElecPompe-Pompe'],
            nbService: ['',Validators.required],
            nbSecours: ['',Validators.required],
            genre:['',Validators.required],
            marque: ['',Validators.required],
            operatingDate: ['' ,Validators.required],
            debit:['',Validators.required],
            rotationSpeed:['',Validators.required],
            npsh: ['',Validators.required],
            state: ['',Validators.required],
            hmt:['',Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.grouprElecPPForm = this.createForm();
    }

    onSave(): void {

        const pompe = this.grouprElecPPForm.getRawValue();

        this.composantService.savePompe(pompe,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
