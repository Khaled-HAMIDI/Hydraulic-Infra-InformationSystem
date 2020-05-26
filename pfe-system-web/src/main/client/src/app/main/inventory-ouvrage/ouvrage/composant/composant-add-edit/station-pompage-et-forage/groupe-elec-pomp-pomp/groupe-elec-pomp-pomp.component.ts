import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {EquipementHydroMeca, GroupeElectroMoteur, GroupeElectroPompe} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-groupe-elec-pomp-pomp',
  templateUrl: './groupe-elec-pomp-pomp.component.html',
  styleUrls: ['./groupe-elec-pomp-pomp.component.scss'],
    animations: fuseAnimations
})
export class GroupeElecPompPompComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    groupe:GroupeElectroPompe;
    grouprElecPPForm: FormGroup;

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
        this.groupe=new GroupeElectroPompe();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.groupe = response.data.pompeData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['GroupeElecPompe_Pompe'],
            nbService: [composant.nbService,Validators.required],
            nbSecours: [composant.nbSecours,Validators.required],
            genre:[composant.genre,Validators.required],
            marque: [composant.marque,Validators.required],
            operatingDate: [composant.operatingDate ,Validators.required],
            debit:[composant.debit,Validators.required],
            rotationSpeed:[composant.rotationSpeed,Validators.required],
            npsh: [composant.npsh,Validators.required],
            state: [composant.state,Validators.required],
            hmt:[composant.hmt,Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.groupe) this.grouprElecPPForm = this.createForm(this.groupe);
            else this.exist=false;
        }
        else {
            this.groupe=new GroupeElectroPompe();
            this.grouprElecPPForm = this.createForm(this.groupe);
        }
    }

    onSave(): void {

        const pompe = this.grouprElecPPForm.getRawValue();

        this.composantService.savePompe(pompe,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
