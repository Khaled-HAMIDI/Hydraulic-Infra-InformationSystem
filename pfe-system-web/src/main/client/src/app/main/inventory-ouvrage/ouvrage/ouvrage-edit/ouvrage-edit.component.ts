import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {Ouvrage, OuvrageEdit} from "../../../model/ouvrage.model";
import {OuvrageEditService} from "./ouvrage-edit.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';
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
    private _unsubscribeAll: Subject<any>;
    filesToBeAttached: any[];
    isFilesValid: boolean;
    public onUploadEventSubject: Subject<void>;

    constructor(
        private toolsService: ToolsService,
        private router: Router,
        private route :ActivatedRoute,
        private ouvrageEditService: OuvrageEditService,
        private formBuilder: FormBuilder,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.ouvrage = new Ouvrage();
        this.ouvrageEdit = new OuvrageEdit();
        this._unsubscribeAll = new Subject();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        //  File Init
        this.onUploadEventSubject = new Subject();
        this.isFilesValid = false;
        this.filesToBeAttached = [
            {
                name: 'PV de réception',
                title: 'PV de réception',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , if case update set id of entity 
                attachedDocumentType: 'PV_REC',
                required: true
            },
            {
                name: 'Documentation technique',
                title: 'Documentation technique',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'DOC_TECH'
            },
            {
                name: 'Plans de recollement',
                title: 'Plans de recollement',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'PLAN_RC'
            },
            {
                name: 'Fiche technique',
                title: 'Fiche technique',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'FICH_TECH'
            }
        ];
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[0]);
                this.ouvrage= new Ouvrage(response.data[0]);
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
                this.filesToBeAttached.forEach(item => {
                    item.attachmentEntityId = response.data[0].code
                  });
            },
            (error) => {
                console.log(error);
            }
        );
        this.ouvrageEditService.get(this.route.snapshot.params['code']).then(
            (ouvrage) => {
                

            },
            (error) => {
                console.log(error);
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
                this.onSubmitFiles();
            });
    }
    // File Functions-------------------------------------------------------------------------
    onAllRequiredAttached(isFilesValid: boolean): void {
        this.isFilesValid = isFilesValid;
    }
    uploadFiles(): void {
        this.onUploadEventSubject.next();
    }
    errorUploadFiles(): void {
        this.toolsService.hideProgressBar();
        this.toolsService.showError("error Upload Files");
        this.router.navigate(['/patrimony/ouvrages/'+this.ouvrage.code+'/show']);
    }
    successUploadFiles(): void {
        this.toolsService.hideProgressBar();
        //this.toolsService.showSuccess("success Upload Files");
        this.router.navigate(['/patrimony/ouvrages/'+this.ouvrage.code+'/show']);
    }

    onSubmitFiles() {
        this.uploadFiles();
    }
    //---------------------------------------------------------------------

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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
