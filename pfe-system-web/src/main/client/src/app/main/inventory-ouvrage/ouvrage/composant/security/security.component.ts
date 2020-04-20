import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {ComposantService} from "../composant.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
    animations: fuseAnimations
})
export class SecurityComponent implements OnInit{

    securityForm: FormGroup;

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
            typeComposant:['Security'],
            state: ['',Validators.required],
            closing: [true,Validators.required],
            telsurveillance:[true,Validators.required],
            guerites: ['',Validators.required],
            agents: ['' ,Validators.required],
            nature:['',Validators.required],
            armement:[true,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.securityForm = this.createForm();
    }

    onSave(): void {

        const security = this.securityForm.getRawValue();
        console.log(security);

        this.composantService.saveSecurity(security)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }

}
