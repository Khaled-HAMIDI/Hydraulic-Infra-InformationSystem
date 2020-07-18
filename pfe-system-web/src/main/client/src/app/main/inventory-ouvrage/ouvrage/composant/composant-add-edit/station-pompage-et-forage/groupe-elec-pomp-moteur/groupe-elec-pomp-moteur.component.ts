import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {AntiBelier, EquipementHydroMeca, GroupeElectroMoteur} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-groupe-elec-pomp-moteur',
  templateUrl: './groupe-elec-pomp-moteur.component.html',
  styleUrls: ['./groupe-elec-pomp-moteur.component.scss'],
    animations: fuseAnimations
})
export class GroupeElecPompMoteurComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    groupe:GroupeElectroMoteur;
    grouprElecPMForm: FormGroup;
    states:any[];

    @Output() validateEvent = new EventEmitter<string>();

    constructor(
        private composantService : ComposantSaveService,
        private formBuilder: FormBuilder,
        private router :Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.add=true;
        this.exist=true;
        this.groupe=new GroupeElectroMoteur();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.groupe = response.data.moteurData;
                this.initForm(response.action);
                this.states =response.data.stateData;
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['GroupeElecPompe_Moteur'],
            nbService: [composant.nbService,Validators.required],
            nbSecours: [composant.nbSecours,Validators.required],
            puissance:[composant.puissance,Validators.required],
            marque: [composant.marque,Validators.required],
            commissioningDate: [composant.commissioningDate,Validators.required],
            type:[composant.type,Validators.required],
            tensionAlimentation:[composant.tensionAlimentation,Validators.required],
            intensite: [composant.intensite,Validators.required],
            modeDemarrage: [composant.modeDemarrage,Validators.required],
            state:[composant.state,Validators.required],
            speed:[composant.speed,Validators.required],
            cost:[composant.cost,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.groupe) this.grouprElecPMForm = this.createForm(this.groupe);
            else this.exist=false;
        }
        else {
            this.groupe=new GroupeElectroMoteur();
            this.grouprElecPMForm = this.createForm(this.groupe);
        }
    }

    toggleExist(){
        this.add =true;
        this.exist =true;
        this.initForm('add');
    }

    onSave(): void {

        const moteur = this.grouprElecPMForm.getRawValue();

        this.composantService.saveMoteur(moteur,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }




}
