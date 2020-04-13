import {Component, OnInit} from '@angular/core';
import {Ouvrage} from '../../../model/ouvrage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';




@Component({
  selector: 'app-ouvrage-add',
  templateUrl: './ouvrage-add.component.html',
  styleUrls: ['./ouvrage-add.component.scss'],
    animations: fuseAnimations
})

export class OuvrageAddComponent implements OnInit{

    ouvrage: Ouvrage;
    ouvrageForm: FormGroup;
    autoCordinate :boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router :Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.ouvrage = new Ouvrage();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.autoCordinate=false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
     this.initForm();

    }


    createOuvrageForm(): FormGroup {
        let obj = {
            type: [this.ouvrage.type,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.ouvrage = new Ouvrage();
        this.ouvrage.enabled = true;
        this.ouvrage.specializedLine = true;
        this.ouvrage.abri = true;
        this.ouvrage.remoteManagement = true;
        this.ouvrage.waterTank = true;
        this.ouvrage.electricAlimentation = true;
        this.ouvrageForm = this.createOuvrageForm();
    }


    onSelect(): void {
        this.router.navigate([this.ouvrageForm.get('type').value],{relativeTo:this.route});
    }

}




