import {Component, OnInit, OnDestroy} from '@angular/core';
import {Ouvrage} from '../../../model/ouvrage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OuvrageAddService } from './ouvrage-add.service';
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

export class OuvrageAddComponent implements OnInit, OnDestroy {

    ouvrage: Ouvrage;
    ouvrageForm: FormGroup;
    autoCordinate :boolean;

    constructor(
        private ouvrageAddService: OuvrageAddService,
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

    /*Forms types*/

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

    /**
     * Save ouvrage
     */


    onSelect(): void {
        this.router.navigate([this.ouvrageForm.get('type').value],{relativeTo:this.route});
    }

    /*onSave(): void {
        const ouvrage = this.ouvrageForm.getRawValue();

        if (ouvrage.tankRole == '') ouvrage.tankRole = 'none';
        if (ouvrage.tankType == '') ouvrage.tankType = 'none';
        if (ouvrage.waterSource == '') ouvrage.waterSource = 'none';
        if (ouvrage.process == '') ouvrage.process = 'none';
        if (ouvrage.state == '') ouvrage.state = 'none';
        if (ouvrage.form == '') ouvrage.form = 'none';
        if (ouvrage.type == '') ouvrage.type = 'none';
        if (ouvrage.treatmentStationType == '') ouvrage.treatmentStationType = 'none';


        this.ouvrageAddService.saveOuvrage(ouvrage)
        .then((response) => {
            console.log("It worked");
        },
            (error) => {
            console.log("No")
        });
    }
*/


    ngOnDestroy(): void {

    }

    /**
     * To toggle the sliders
     */
}




