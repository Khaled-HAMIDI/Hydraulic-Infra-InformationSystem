import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";


@Component({
  selector: 'app-kit-membrane',
  templateUrl: './kit-membrane.component.html',
  styleUrls: ['./kit-membrane.component.scss'],
    animations: fuseAnimations
})
export class KitMembraneComponent implements OnInit{

    kitMembraneForm: FormGroup;

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
            typeComposant:['KitMembrane'],
            nombre: ['',Validators.required],
            caracteristique: ['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.kitMembraneForm = this.createForm();
    }

    onSave(): void {

        const kit = this.kitMembraneForm.getRawValue();

        this.composantService.saveKitMembrane(kit,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
