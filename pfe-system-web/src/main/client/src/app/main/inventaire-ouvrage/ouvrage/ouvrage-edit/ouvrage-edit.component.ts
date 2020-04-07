import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {Ouvrage} from "../../../model/ouvrage.model";
import {OuvrageEditService} from "./ouvrage-edit.service";

@Component({
  selector: 'app-ouvrage-edit',
  templateUrl: './ouvrage-edit.component.html',
  styleUrls: ['./ouvrage-edit.component.scss'],
    animations: fuseAnimations
})

export class OuvrageEditComponent implements OnInit, OnDestroy {

    ouvrage: Ouvrage;
    test: Ouvrage;
    ouvrageForm: FormGroup;
    ouvrageCode: string;


    constructor(
        private ouvrageEditService: OuvrageEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.ouvrage = new Ouvrage();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    ngOnInit(): void {
        console.log(this.route.snapshot.params['code']);
        this.ouvrageEditService.get(this.route.snapshot.params['code']).then(
            (ouvrage) => {
                this.initForm(ouvrage);

            },
            (error) => {
                this.test = new Ouvrage();
                this.initForm(this.test);
                console.log(error);
            }
        );
    }


    createUserForm(): FormGroup {

        let obj = {
            enabled: [this.ouvrage.enabled, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            currentCapacity: [this.ouvrage.currentCapacity,Validators.required],
            power: [this.ouvrage.power, Validators.required],
            pumpDebit: [this.ouvrage.pumpDebit, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            abri: [this.ouvrage.abri, Validators.required],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill, Validators.required],
            coteTn: [this.ouvrage.coteTn, Validators.required],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker, Validators.required],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval, Validators.required],
            currentDebit: [this.ouvrage.currentDebit, Validators.required],
            electricAlimentation: [this.ouvrage.electricAlimentation, Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    onSave(): void {
        const ouvrage = this.ouvrageForm.getRawValue();
        console.log(ouvrage);


        this.ouvrageEditService.saveOuvrage(ouvrage,this.ouvrage.code)
            .then(() => {
                console.log("It worked");
            });
    }

    initForm(ouvrage) {

        this.ouvrage= new Ouvrage(ouvrage);

        this.ouvrageForm = this.createUserForm();

    }

    ngOnDestroy(): void {
    }


    toggleAbri(): void {
        this.ouvrage.abri = !this.ouvrage.abri;
    }

    toggleEnabled(): void {
        this.ouvrage.enabled = !this.ouvrage.enabled;
    }

    toggleSpecializedLine() :void {
        this.ouvrage.specializedLine = !this.ouvrage.specializedLine;
    }


    toggleRemoteManagement() :void {
        this.ouvrage.remoteManagement = !this.ouvrage.remoteManagement;
    }

    toggleElectricAlimentation() :void {
        this.ouvrage.electricAlimentation = !this.ouvrage.electricAlimentation;
    }
}
