import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {ForageService} from "./forage.service";
import {Ouvrage} from "../../../../../model/ouvrage.model";



/* A appliquer pour le code des ouvrages
const REGX_CODE = "^[a-zA-Z0-9]{2}$";*/


@Component({
  selector: 'app-forage',
  templateUrl: './forage.component.html',
  styleUrls: ['./forage.component.scss'],
    animations: fuseAnimations
})
export class ForageComponent implements OnInit, OnDestroy {

    ouvrage: Ouvrage;
    ouvrageAdd: Ouvrage;
    ouvrageForm: FormGroup;

    autoCordinate :boolean;

    constructor(
        private router :Router,
        private forageService: ForageService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.ouvrage = new Ouvrage();
        this.ouvrage.enabled = true;
        this.ouvrage.specializedLine = true;
        this.ouvrage.abri = true;
        this.ouvrage.remoteManagement = true;
        this.ouvrage.waterTank = true;
        this.ouvrage.electricAlimentation = true;

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.autoCordinate=false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.initFormForage();

    }

    createForageForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code, Validators.required],
            name: [this.ouvrage.name , Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ, Validators.required],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            hmt: [this.ouvrage.hmt, Validators.required],
            power: [this.ouvrage.power, Validators.required],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            abri: [this.ouvrage.abri, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            populationServed: [this.ouvrage.populationServed],
            currentDebit: [this.ouvrage.currentDebit, Validators.required],
            exploitationDebit: [this.ouvrage.exploitationDebit, Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initFormForage(){
        this.ouvrageForm = this.createForageForm();
    }

    /**
     * Save ouvrage
     */
    onSave(): void {
        const ouvrage = this.ouvrageForm.getRawValue();
        this.ouvrageAdd = new  Ouvrage();

        this.ouvrageAdd.code = ouvrage.code;
        this.ouvrageAdd.name = ouvrage.name;
        this.ouvrageAdd.type = 'Forage';
        this.ouvrageAdd.enabled = ouvrage.enabled;
        this.ouvrageAdd.state = ouvrage.state;
        this.ouvrageAdd.nbCompartment = ouvrage.nbCompartment;
        this.ouvrageAdd.coordinateX = ouvrage.coordinateX;
        this.ouvrageAdd.coordinateY = ouvrage.coordinateY;
        this.ouvrageAdd.coordinateZ = ouvrage.coordinateZ;
        this.ouvrageAdd.area = ouvrage.area;
        this.ouvrageAdd.hmt = ouvrage.hmt;
        this.ouvrageAdd.power = ouvrage.power;
        this.ouvrageAdd.constructionType = ouvrage.constructionType;
        this.ouvrageAdd.commissioningDate = ouvrage.commissioningDate;
        this.ouvrageAdd.operatingDate = ouvrage.operatingDate;
        this.ouvrageAdd.maitreOuvrage = ouvrage.maitreOuvrage;
        this.ouvrageAdd.realizationCost = ouvrage.realizationCost;
        this.ouvrageAdd.remoteManagement = ouvrage.remoteManagement;
        this.ouvrageAdd.specializedLine = ouvrage.specializedLine;
        this.ouvrageAdd.abri = ouvrage.abri;
        this.ouvrageAdd.energyMonthlyBill = ouvrage.energyMonthlyBill;
        this.ouvrageAdd.totalWorkforce = ouvrage.totalWorkforce;
        this.ouvrageAdd.distribution = ouvrage.distribution;
        this.ouvrageAdd.populationServed = ouvrage.populationServed;
        this.ouvrageAdd.currentDebit = ouvrage.currentDebit;
        this.ouvrageAdd.exploitationDebit = ouvrage.exploitationDebit;

        if (this.ouvrageAdd.tankRole == '') this.ouvrageAdd.tankRole = 'none';
        if (this.ouvrageAdd.tankType == '') this.ouvrageAdd.tankType = 'none';
        if (this.ouvrageAdd.waterSource == '') this.ouvrageAdd.waterSource = 'none';
        if (this.ouvrageAdd.process == '') this.ouvrageAdd.process = 'none';
        if (this.ouvrageAdd.state == '') this.ouvrageAdd.state = 'none';
        if (this.ouvrageAdd.form == '') this.ouvrageAdd.form = 'none';
        if (this.ouvrageAdd.type == '') this.ouvrageAdd.type = 'none';
        if (this.ouvrageAdd.treatmentStationType == '') this.ouvrageAdd.treatmentStationType = 'none';


        this.forageService.saveOuvrage(this.ouvrageAdd)
            .then((response) => {
                    console.log("It worked");
                    this.router.navigate(['composants'],{relativeTo:this.route});
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


    toggleRemoteManagement() :void {
        this.ouvrage.remoteManagement = !this.ouvrage.remoteManagement;
    }


    toggleCordonates() :void {
        if (this.autoCordinate){
            this.ouvrageForm.controls['coordinateX'].setValue('');
            this.ouvrageForm.controls['coordinateY'].setValue('');
            this.ouvrageForm.controls['coordinateZ'].setValue('');
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
    showPosition(position) :void{
        this.ouvrageForm.controls['coordinateX'].setValue(position.coords.latitude);
        this.ouvrageForm.controls['coordinateY'].setValue(position.coords.longitude);
        this.ouvrageForm.controls['coordinateZ'].setValue(position.coords.altitude);
    }

}
