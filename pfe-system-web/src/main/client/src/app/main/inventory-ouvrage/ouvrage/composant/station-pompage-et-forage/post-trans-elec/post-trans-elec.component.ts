import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-post-trans-elec',
  templateUrl: './post-trans-elec.component.html',
  styleUrls: ['./post-trans-elec.component.scss'],
    animations: fuseAnimations
})
export class PostTransElecComponent implements OnInit{

    postTransElecForm: FormGroup;

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
            typeComposant:['PosteTransformationElectrique'],
            marque: ['',Validators.required],
            puissance: ['',Validators.required],
            couplage:['',Validators.required],
            up: ['',Validators.required],
            is: ['' ,Validators.required],
            ucc:['',Validators.required],
            natureHuile:['',Validators.required],
            natureAbri: ['',Validators.required],
            pmt: ['',Validators.required],
            pbt:['',Validators.required],
            pmd: ['',Validators.required],
            tarif: [true ,Validators.required],
            pma:['',Validators.required],
            typeComptage:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.postTransElecForm = this.createForm();
    }

    onSave(): void {

        const post = this.postTransElecForm.getRawValue();

        this.composantService.savePostTrandformationElectrique(post)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
