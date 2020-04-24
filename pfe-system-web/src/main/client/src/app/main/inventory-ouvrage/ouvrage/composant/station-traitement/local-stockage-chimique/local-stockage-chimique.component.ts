import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-local-stockage-chimique',
  templateUrl: './local-stockage-chimique.component.html',
  styleUrls: ['./local-stockage-chimique.component.scss'],
    animations: fuseAnimations
})
export class LocalStockageChimiqueComponent implements OnInit{

    localStockageChimiqueForm: FormGroup;

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
            typeComposant:['LocalStockageChimique'],
            state: ['',Validators.required],
            type: ['',Validators.required],
            form:['',Validators.required],
            dimension: ['',Validators.required],
            arrangement : [true ,Validators.required],
            number:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.localStockageChimiqueForm = this.createForm();
    }

    onSave(): void {

        const local = this.localStockageChimiqueForm.getRawValue();

        this.composantService.saveLocalStockageChimique(local,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
