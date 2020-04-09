import {Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Ouvrage} from '../../../model/ouvrage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OuvrageAddService } from './ouvrage-add.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';



/* A appliquer pour le code des ouvrages
const REGX_CODE = "^[a-zA-Z0-9]{2}$";*/

@Component({
  selector: 'app-ouvrage-add',
  templateUrl: './ouvrage-add.component.html',
  styleUrls: ['./ouvrage-add.component.scss'],
    animations: fuseAnimations
})

export class OuvrageAddComponent implements OnInit, OnDestroy {

    ouvrage: Ouvrage;
    ouvrageForm: FormGroup;

    @ViewChild('locx',{static: false}) locx: ElementRef;
    @ViewChild('locy',{static: false}) locy: ElementRef;
    @ViewChild('locz',{static: false}) locz: ElementRef;

    autoCordinate :boolean;

    constructor(
        private cdRef:ChangeDetectorRef,
        private ouvrageAddService: OuvrageAddService,
        private formBuilder: FormBuilder,
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
            code: [this.ouvrage.code],
            name: [this.ouvrage.name , Validators.required],
            type: [this.ouvrage.type, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            process: [this.ouvrage.process, Validators.required],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating, Validators.required],

            coteTropFull: [this.ouvrage.coteTropFull, Validators.required],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            installedCapacity: [this.ouvrage.installedCapacity, Validators.required],
            currentCapacity: [this.ouvrage.currentCapacity, Validators.required],
            hmt: [this.ouvrage.hmt, Validators.required],
            power: [this.ouvrage.power, Validators.required],
            nbPump: [this.ouvrage.nbPump, Validators.required],
            pumpDebit: [this.ouvrage.pumpDebit, Validators.required],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            waterSource: [this.ouvrage.waterSource, Validators.required],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            waterTank: [this.ouvrage.waterTank, Validators.required],
            tankCapacity1: [this.ouvrage.tankCapacity1, Validators.required],
            tankCapacity2: [this.ouvrage.tankCapacity2, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill, Validators.required],
            coteTn: [this.ouvrage.coteTn, Validators.required],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker, Validators.required],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval, Validators.required],
            currentDebit: [this.ouvrage.currentDebit, Validators.required],
            exploitationDebit: [this.ouvrage.exploitationDebit, Validators.required],
            electricAlimentation: [this.ouvrage.electricAlimentation, Validators.required],
            tankType: [this.ouvrage.tankType, Validators.required],
            tankRole: [this.ouvrage.tankRole, Validators.required],
            treatmentStationType: [this.ouvrage.treatmentStationType,Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    createReservoirForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code, Validators.required],
            name: [this.ouvrage.name , Validators.required],
            type: [this.ouvrage.type, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            process: [this.ouvrage.process],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating, Validators.required],

            coteTropFull: [this.ouvrage.coteTropFull, Validators.required],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            installedCapacity: [this.ouvrage.installedCapacity],
            currentCapacity: [this.ouvrage.currentCapacity],
            hmt: [this.ouvrage.hmt],
            power: [this.ouvrage.power],
            nbPump: [this.ouvrage.nbPump],
            pumpDebit: [this.ouvrage.pumpDebit],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            waterSource: [this.ouvrage.waterSource],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            waterTank: [this.ouvrage.waterTank],
            tankCapacity1: [this.ouvrage.tankCapacity1, Validators.required],
            tankCapacity2: [this.ouvrage.tankCapacity2],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill],
            coteTn: [this.ouvrage.coteTn],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval],
            currentDebit: [this.ouvrage.currentDebit],
            exploitationDebit: [this.ouvrage.exploitationDebit],
            electricAlimentation: [this.ouvrage.electricAlimentation, Validators.required],
            tankType: [this.ouvrage.tankType, Validators.required],
            tankRole: [this.ouvrage.tankRole, Validators.required],
            treatmentStationType: [this.ouvrage.treatmentStationType],
        };

        return this.formBuilder.group(obj);

    }

    createStTraitCForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code],
            name: [this.ouvrage.name , Validators.required],
            type: [this.ouvrage.type, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form],
            state: [this.ouvrage.state, Validators.required],
            process: [this.ouvrage.process, Validators.required],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating],

            coteTropFull: [this.ouvrage.coteTropFull],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            installedCapacity: [this.ouvrage.installedCapacity],
            currentCapacity: [this.ouvrage.currentCapacity],
            hmt: [this.ouvrage.hmt],
            power: [this.ouvrage.power],
            nbPump: [this.ouvrage.nbPump],
            pumpDebit: [this.ouvrage.pumpDebit],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            waterSource: [this.ouvrage.waterSource, Validators.required],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            waterTank: [this.ouvrage.waterTank],
            tankCapacity1: [this.ouvrage.tankCapacity1],
            tankCapacity2: [this.ouvrage.tankCapacity2],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill, Validators.required],
            coteTn: [this.ouvrage.coteTn],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval],
            currentDebit: [this.ouvrage.currentDebit],
            exploitationDebit: [this.ouvrage.exploitationDebit],
            electricAlimentation: [this.ouvrage.electricAlimentation],
            tankType: [this.ouvrage.tankType],
            tankRole: [this.ouvrage.tankRole],
            treatmentStationType: [this.ouvrage.treatmentStationType,Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    createStTraitNCForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code, Validators.required],
            name: [this.ouvrage.name , Validators.required],
            type: [this.ouvrage.type, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form],
            state: [this.ouvrage.state, Validators.required],
            process: [this.ouvrage.process, Validators.required],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating],

            coteTropFull: [this.ouvrage.coteTropFull],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            installedCapacity: [this.ouvrage.installedCapacity],
            currentCapacity: [this.ouvrage.currentCapacity],
            hmt: [this.ouvrage.hmt],
            power: [this.ouvrage.power],
            nbPump: [this.ouvrage.nbPump],
            pumpDebit: [this.ouvrage.pumpDebit],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            waterSource: [this.ouvrage.waterSource],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            waterTank: [this.ouvrage.waterTank],
            tankCapacity1: [this.ouvrage.tankCapacity1],
            tankCapacity2: [this.ouvrage.tankCapacity2],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill],
            coteTn: [this.ouvrage.coteTn],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval],
            currentDebit: [this.ouvrage.currentDebit],
            exploitationDebit: [this.ouvrage.exploitationDebit],
            electricAlimentation: [this.ouvrage.electricAlimentation],
            tankType: [this.ouvrage.tankType],
            tankRole: [this.ouvrage.tankRole],
            treatmentStationType: [this.ouvrage.treatmentStationType,Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    createStPompageForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code, Validators.required],
            name: [this.ouvrage.name , Validators.required],
            type: [this.ouvrage.type, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form],
            state: [this.ouvrage.state, Validators.required],
            process: [this.ouvrage.process],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating],

            coteTropFull: [this.ouvrage.coteTropFull],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            installedCapacity: [this.ouvrage.installedCapacity, Validators.required],
            currentCapacity: [this.ouvrage.currentCapacity, Validators.required],
            hmt: [this.ouvrage.hmt],
            power: [this.ouvrage.power],
            nbPump: [this.ouvrage.nbPump],
            pumpDebit: [this.ouvrage.pumpDebit],
            constructionType: [this.ouvrage.constructionType],
            waterSource: [this.ouvrage.waterSource],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            waterTank: [this.ouvrage.waterTank, Validators.required],
            tankCapacity1: [this.ouvrage.tankCapacity1],
            tankCapacity2: [this.ouvrage.tankCapacity2, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill],
            coteTn: [this.ouvrage.coteTn],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval],
            currentDebit: [this.ouvrage.currentDebit],
            exploitationDebit: [this.ouvrage.exploitationDebit],
            electricAlimentation: [this.ouvrage.electricAlimentation],
            tankType: [this.ouvrage.tankType],
            tankRole: [this.ouvrage.tankRole],
            treatmentStationType: [this.ouvrage.treatmentStationType],
        };

        return this.formBuilder.group(obj);

    }

    createForageForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code, Validators.required],
            name: [this.ouvrage.name , Validators.required],
            type: [this.ouvrage.type, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form],
            state: [this.ouvrage.state, Validators.required],
            process: [this.ouvrage.process],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating],

            coteTropFull: [this.ouvrage.coteTropFull],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            installedCapacity: [this.ouvrage.installedCapacity],
            currentCapacity: [this.ouvrage.currentCapacity],
            hmt: [this.ouvrage.hmt, Validators.required],
            power: [this.ouvrage.power, Validators.required],
            nbPump: [this.ouvrage.nbPump],
            pumpDebit: [this.ouvrage.pumpDebit],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            waterSource: [this.ouvrage.waterSource],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            waterTank: [this.ouvrage.waterTank],
            tankCapacity1: [this.ouvrage.tankCapacity1],
            tankCapacity2: [this.ouvrage.tankCapacity2],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill],
            coteTn: [this.ouvrage.coteTn],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval],
            currentDebit: [this.ouvrage.currentDebit, Validators.required],
            exploitationDebit: [this.ouvrage.exploitationDebit, Validators.required],
            electricAlimentation: [this.ouvrage.electricAlimentation],
            tankType: [this.ouvrage.tankType],
            tankRole: [this.ouvrage.tankRole],
            treatmentStationType: [this.ouvrage.treatmentStationType],
        };

        return this.formBuilder.group(obj);

    }

    createBriseChargeForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code, Validators.required],
            name: [this.ouvrage.name , Validators.required],
            type: [this.ouvrage.type, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form],
            state: [this.ouvrage.state, Validators.required],
            process: [this.ouvrage.process],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating],

            coteTropFull: [this.ouvrage.coteTropFull],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            installedCapacity: [this.ouvrage.installedCapacity],
            currentCapacity: [this.ouvrage.currentCapacity],
            hmt: [this.ouvrage.hmt],
            power: [this.ouvrage.power],
            nbPump: [this.ouvrage.nbPump],
            pumpDebit: [this.ouvrage.pumpDebit],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            waterSource: [this.ouvrage.waterSource],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            waterTank: [this.ouvrage.waterTank],
            tankCapacity1: [this.ouvrage.tankCapacity1],
            tankCapacity2: [this.ouvrage.tankCapacity2],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],

            chemicalMonthlyBill: [this.ouvrage.chemicalMonthlyBill],
            coteTn: [this.ouvrage.coteTn, Validators.required],
            debitLoadBreaker: [this.ouvrage.debitLoadBreaker, Validators.required],
            chargesAmontEtAval: [this.ouvrage.chargesAmontEtAval, Validators.required],
            currentDebit: [this.ouvrage.currentDebit],
            exploitationDebit: [this.ouvrage.exploitationDebit],
            electricAlimentation: [this.ouvrage.electricAlimentation, Validators.required],
            tankType: [this.ouvrage.tankType],
            tankRole: [this.ouvrage.tankRole],
            treatmentStationType: [this.ouvrage.treatmentStationType],
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

    initFormStationTC(){
        this.ouvrage.type = 'StationTraitementConventionelle';
        this.ouvrageForm = this.createStTraitCForm();
    }


    initFormStationTNC(){
        this.ouvrage.type = 'StationTraitementNonConventionelle';
        this.ouvrageForm = this.createStTraitNCForm();
    }

    initFormStationPompage(){
        this.ouvrage.type = 'StationPompage';
        this.ouvrageForm = this.createStPompageForm();
    }

    initFormReservoir(){
        this.ouvrage.type = 'Reservoir';
        this.ouvrageForm = this.createReservoirForm();
    }

    initFormBriseCharge(){
        this.ouvrage.type = 'BriseCharge';
        this.ouvrageForm = this.createBriseChargeForm();
        // this.cdRef.detectChanges();
    }

    initFormForage(){
        this.ouvrage.type = 'Forage';
        this.ouvrageForm = this.createForageForm();
    }

    /**
     * Save ouvrage
     */
    onSave(): void {
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



    ngOnDestroy(): void {

    }

    /**
     * To toggle the sliders
     */
    toggleEnabled(): void {
        this.ouvrage.enabled = !this.ouvrage.enabled;
    }

    toggleDistribution() :void {
        this.ouvrage.distribution = !this.ouvrage.distribution;
    }

    toggleAbri(): void {
        this.ouvrage.abri = !this.ouvrage.abri;
    }

    toggleSpecializedLine() :void {
        this.ouvrage.specializedLine = !this.ouvrage.specializedLine;
    }

    toggleWaterTank(): void {
        this.ouvrage.waterTank = !this.ouvrage.waterTank;
    }

    toggleRemoteManagement() :void {
        this.ouvrage.remoteManagement = !this.ouvrage.remoteManagement;
    }

    toggleElectricAlimentation() :void {
        this.ouvrage.electricAlimentation = !this.ouvrage.electricAlimentation;
    }

    toggleCordonates() :void {
        if (this.autoCordinate){
            this.locx.nativeElement.value = '';
            this.locy.nativeElement.value = '';
            this.locz.nativeElement.value = '';
            this.autoCordinate = !this.autoCordinate;
        }
        else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            } else {
                console.log("Geolocation is not supported by this browser");
            }
            this.autoCordinate = !this.autoCordinate;
        }

    }

    test() : void{
        console.log(this.ouvrageForm.valid);
    }

    showPosition(position) :void{
        this.locx.nativeElement.value = position.coords.latitude;
        this.locy.nativeElement.value = position.coords.longitude;
        this.locz.nativeElement.value = position.coords.altitude;
    }
}




