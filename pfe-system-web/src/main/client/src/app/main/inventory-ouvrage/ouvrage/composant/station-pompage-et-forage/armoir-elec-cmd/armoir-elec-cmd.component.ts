import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-armoir-elec-cmd',
  templateUrl: './armoir-elec-cmd.component.html',
  styleUrls: ['./armoir-elec-cmd.component.scss'],
    animations: fuseAnimations
})
export class ArmoirElecCmdComponent implements OnInit{

    armoirElecForm: FormGroup;

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
            typeComposant:['ArmoireElectrique'],
            puissance:['',Validators.required],
            number: ['',Validators.required],
            state:['',Validators.required],
            observation:['',Validators.required],
            marque:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.armoirElecForm = this.createForm();
    }

    onSave(): void {

        const armoire = this.armoirElecForm.getRawValue();

        this.composantService.saveArmoire(armoire)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
