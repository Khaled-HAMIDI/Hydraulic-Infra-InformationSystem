import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';

@Component({
  selector: 'app-reservoir-eau-traite',
  templateUrl: './reservoir-eau-traite.component.html',
  styleUrls: ['./reservoir-eau-traite.component.scss'],
    animations: fuseAnimations
})
export class ReservoirEauTraiteComponent implements OnInit{

    reservoirEauTraitForm: FormGroup;

    constructor(
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
            state: ['',Validators.required],
            type: ['',Validators.required],
            form:['',Validators.required],
            capacity: ['',Validators.required],
            enabled: [true ,Validators.required],
            nature:['',Validators.required],
            number:['',Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.reservoirEauTraitForm = this.createForm();
    }


}
