import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";


@Component({
  selector: 'app-collecteur-reffoullement',
  templateUrl: './collecteur-reffoullement.component.html',
  styleUrls: ['./collecteur-reffoullement.component.scss'],
    animations: fuseAnimations
})
export class CollecteurReffoullementComponent implements OnInit{

    equipementHydroMecaForm: FormGroup;

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
            typeComposant:['ComposantHydroMecanique'],
            equipementType:['CollecteurReffoulement'],
            dn: ['',Validators.required],
            pn:['',Validators.required],
            state:['',Validators.required],
            materiaux:['',Validators.required],
            lieuImplantation:['',Validators.required],
            type:['',Validators.required],
            number:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.equipementHydroMecaForm = this.createForm();
    }

    onSave(): void {

        const equipementHydroMeca = this.equipementHydroMecaForm.getRawValue();

        this.composantService.saveHydroMeca(equipementHydroMeca)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }

}
