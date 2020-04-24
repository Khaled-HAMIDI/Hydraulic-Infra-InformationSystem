import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";


@Component({
  selector: 'app-station-php',
  templateUrl: './station-php.component.html',
  styleUrls: ['./station-php.component.scss'],
    animations: fuseAnimations
})
export class StationPhpComponent implements OnInit{

    stationPhpForm: FormGroup;

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
            typeComposant:['StationPHP'],
            puissance: ['',Validators.required],
            hmt: ['',Validators.required],
            nombre:['',Validators.required],
            debit: ['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.stationPhpForm = this.createForm();
    }

    onSave(): void {

        const stationPhp = this.stationPhpForm.getRawValue();

        this.composantService.saveStationPhp(stationPhp,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
