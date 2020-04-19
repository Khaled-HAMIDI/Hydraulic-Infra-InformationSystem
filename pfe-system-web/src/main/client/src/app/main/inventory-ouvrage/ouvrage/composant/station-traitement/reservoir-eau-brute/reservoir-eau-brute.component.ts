import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';


@Component({
  selector: 'app-reservoir-eau-brute',
  templateUrl: './reservoir-eau-brute.component.html',
  styleUrls: ['./reservoir-eau-brute.component.scss'],
    animations: fuseAnimations
})
export class ReservoirEauBruteComponent implements OnInit{

    reservoirEauBruteForm: FormGroup;

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
        this.reservoirEauBruteForm = this.createForm();
    }


}
