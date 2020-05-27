import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {EquipementStationTraitement} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-reservoir-eau-traite',
  templateUrl: './reservoir-eau-traite.component.html',
  styleUrls: ['./reservoir-eau-traite.component.scss'],
    animations: fuseAnimations
})
export class ReservoirEauTraiteComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    equipement:EquipementStationTraitement;
    equipements : EquipementStationTraitement[];
    reservoirEauTraitForm: FormGroup;

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
        this.equipement=new EquipementStationTraitement();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.equipements = response.data.equipementStationTraitemenData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['EquipementStationTraitement'],
            typeEquipement:['ReservoirEauTraite'],
            state: [composant.state,Validators.required],
            type: [composant.type,Validators.required],
            form:[composant.form,Validators.required],
            capacity: [composant.capacity,Validators.required],
            enabled: [composant.enabled ,Validators.required],
            nature:[composant.nature,Validators.required],
            number:[composant.number,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;

            if(this.typeEquipement(this.equipements)) {
                this.equipement = new EquipementStationTraitement(this.typeEquipement(this.equipements));
                this.reservoirEauTraitForm = this.createForm(this.equipement);
            }
            else this.exist=false;
        }
        else {
            this.equipement=new EquipementStationTraitement();
            this.equipement.enabled=true;
            this.reservoirEauTraitForm = this.createForm(this.equipement);
        }
    }

    typeEquipement(composants):EquipementStationTraitement{
        for (var i in composants){
            if (composants[i].typeEquipement =='ReservoirEauTraite') return composants[i];
        }
        return null;
    }

    toggleExist(){
        this.add =true;
        this.exist =true;
        this.initForm('add');
    }

    toggleEnabled(){
        this.equipement.enabled=!this.equipement.enabled;
        this.reservoirEauTraitForm.controls['enabled'].setValue(!this.reservoirEauTraitForm.get('enabled'));
    }

    onSave(): void {

        const equipement = this.reservoirEauTraitForm.getRawValue();

        this.composantService.saveEquipementStationTraitement(equipement,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }

}
