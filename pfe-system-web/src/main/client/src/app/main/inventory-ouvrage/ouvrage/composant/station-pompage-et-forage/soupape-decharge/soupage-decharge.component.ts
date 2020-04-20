import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-soupage-decharge',
  templateUrl: './soupage-decharge.component.html',
  styleUrls: ['./soupage-decharge.component.scss'],
    animations: fuseAnimations
})
export class SoupageDechargeComponent implements OnInit{

    soupageDechargerForm: FormGroup;

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
            typeComposant:['SoupapeDecharge'],
            marque:['',Validators.required],
            type: ['',Validators.required],
            presseionTarage:['',Validators.required],
            presseionEtanchiete:['',Validators.required],
            presseionService:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.soupageDechargerForm = this.createForm();
    }

    onSave(): void {

        const soupape = this.soupageDechargerForm.getRawValue();

        this.composantService.saveSoupape(soupape)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
