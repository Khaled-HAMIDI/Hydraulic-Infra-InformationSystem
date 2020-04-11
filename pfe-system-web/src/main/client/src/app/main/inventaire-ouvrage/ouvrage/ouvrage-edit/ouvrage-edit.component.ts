import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {Ouvrage, OuvrageEdit} from "../../../model/ouvrage.model";
import {OuvrageEditService} from "./ouvrage-edit.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ouvrage-edit',
  templateUrl: './ouvrage-edit.component.html',
  styleUrls: ['./ouvrage-edit.component.scss'],
    animations: fuseAnimations
})

export class OuvrageEditComponent implements OnInit, OnDestroy {

    ouvrage: Ouvrage;
    ouvrageEdit : OuvrageEdit;
    ouvrageForm: FormGroup;
    ouvrageCode: string;


    constructor(
        private route :ActivatedRoute,
        private ouvrageEditService: OuvrageEditService,
        private formBuilder: FormBuilder,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.ouvrage = new Ouvrage();
        this.ouvrageEdit = new OuvrageEdit();

        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    ngOnInit(): void {
        this.ouvrageEditService.get(this.route.snapshot.params['code']).then(
            (ouvrage) => {
                this.ouvrage= new Ouvrage(ouvrage);
                switch (this.ouvrage.type) {
                    case 'StationTraitementConventionelle':
                        this.ouvrageForm = this.createStationTCForm();
                        break;
                    case 'Reservoir' :
                        this.ouvrageForm = this.createReservoirForm();
                        break;
                    case 'Forage' :
                        this.ouvrageForm =  this.createForageForm();
                        break;
                    case 'StationPompage' :
                        this.ouvrageForm = this.createStationPompageForm();
                        break;
                    case 'StationTraitementNonConventionelle' :
                        this.ouvrageForm = this.createStationTCForm();
                        break;
                    case 'BriseCharge' :
                        this.ouvrageForm = this.createBriseChargeForm();
                        break;
                }

            },
            (error) => {
                console.log('Failed');
            }
        );
    }


    createStationTCForm(): FormGroup {
        let obj = {
            enabled: [this.ouvrage.enabled, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill, Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    createReservoirForm(): FormGroup {

        let obj = {
            enabled: [this.ouvrage.enabled, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            electricAlimentation: [this.ouvrage.electricAlimentation, Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    createForageForm(): FormGroup {

        let obj = {
            enabled: [this.ouvrage.enabled, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            power: [this.ouvrage.power, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            abri: [this.ouvrage.abri, Validators.required],
            currentDebit: [this.ouvrage.currentDebit, Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    createStationPompageForm(): FormGroup {

        let obj = {
            enabled: [this.ouvrage.enabled, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            currentCapacity: [this.ouvrage.currentCapacity,Validators.required],
            power: [this.ouvrage.power, Validators.required],
            pumpDebit: [this.ouvrage.pumpDebit, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    createBriseChargeForm(): FormGroup {

        let obj = {
            enabled: [this.ouvrage.enabled, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            coteTn: [this.ouvrage.coteTn, Validators.required],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker, Validators.required],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval, Validators.required],
            electricAlimentation: [this.ouvrage.electricAlimentation, Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    onSave(): void {
        this.ouvrageEdit = new OuvrageEdit();
        this.ouvrageEdit.enabled = this.ouvrageForm.get('enabled').value ;
        this.ouvrageEdit.state = this.ouvrageForm.get('state').value ;
        this.ouvrageEdit.totalWorkforce = this.ouvrageForm.get('totalWorkforce').value ;
        this.ouvrageEdit.specializedLine = this.ouvrageForm.get('specializedLine').value ;
        this.ouvrageEdit.remoteManagement = this.ouvrageForm.get('remoteManagement').value ;
        this.ouvrageEdit.energyMonthlyBill = this.ouvrageForm.get('energyMonthlyBill').value ;
        this.ouvrageEdit.specializedLine = this.ouvrageForm.get('specializedLine').value ;
        this.ouvrageEdit.remoteManagement = this.ouvrageForm.get('remoteManagement').value ;


        switch (this.ouvrage.type) {
            case 'StationTraitementConventionelle':
                this.ouvrageEdit.chemicalMonthlyBill = this.ouvrageForm.get('chemicalMonthlyBill').value ;
                break;
            case 'Reservoir' :
                this.ouvrageEdit.electricAlimentation = this.ouvrageForm.get('electricAlimentation').value ;
                break;
            case 'Forage' :
                this.ouvrageEdit.power = this.ouvrageForm.get('power').value ;
                this.ouvrageEdit.abri = this.ouvrageForm.get('abri').value ;
                this.ouvrageEdit.currentDebit = this.ouvrageForm.get('currentDebit').value ;
                break;
            case 'StationPompage' :
                this.ouvrageEdit.currentCapacity = this.ouvrageForm.get('currentCapacity').value;
                this.ouvrageEdit.power = this.ouvrageForm.get('power').value ;
                this.ouvrageEdit.pumpDebit = this.ouvrageForm.get('pumpDebit').value ;
                break;
            case 'StationTraitementNonConventionelle' :
                this.ouvrageEdit.chemicalMonthlyBill = this.ouvrageForm.get('chemicalMonthlyBill').value ;
                break;
            case 'BriseCharge' :
                this.ouvrageEdit.coteTn = this.ouvrageForm.get('coteTn').value ;
                this.ouvrageEdit.debitLoadBreaker = this.ouvrageForm.get('debitLoadBreaker').value ;
                this.ouvrageEdit.chargesAmontEtAval = this.ouvrageForm.get('chargesAmontEtAval').value ;
                this.ouvrageEdit.electricAlimentation = this.ouvrageForm.get('electricAlimentation').value ;
                break;
        }

        this.ouvrageEditService.saveOuvrage(this.ouvrageEdit,this.ouvrage.code)
            .then(() => {
                console.log("It worked");
            });
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
