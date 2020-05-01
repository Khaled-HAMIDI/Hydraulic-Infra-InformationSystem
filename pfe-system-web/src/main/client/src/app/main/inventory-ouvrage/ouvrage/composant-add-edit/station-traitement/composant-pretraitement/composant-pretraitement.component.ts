import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantAddEditService} from "../../composant-add-edit.service";
import {Subject} from "rxjs";
import {EquipementStationTraitement} from "../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-composant-pretraitement',
  templateUrl: './composant-pretraitement.component.html',
  styleUrls: ['./composant-pretraitement.component.scss'],
    animations: fuseAnimations
})
export class ComposantPretraitementComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    equipement:EquipementStationTraitement;
    composantPreTraitForm: FormGroup;

    constructor(
        private composantService : ComposantAddEditService,
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
            typeEquipement:['ComposantPretraitement'],
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
            this.composantService.loadEquipementStationTraitement(this.route.snapshot.params['code']).then(
                (composants) => {
                    if(this.typeEquipement(composants)) {
                        this.equipement = new EquipementStationTraitement(this.typeEquipement(composants));
                        this.composantPreTraitForm = this.createForm(this.equipement);
                    }
                    else this.exist=false;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            this.equipement=new EquipementStationTraitement();
            this.equipement.enabled=true;
            this.composantPreTraitForm = this.createForm(this.equipement);
        }
    }

    typeEquipement(composants):EquipementStationTraitement{
        for (var i in composants){
            if (composants[i].typeEquipement =='ComposantPretraitement') return composants[i];
        }
        return null;
    }

    toggleEnabled(){
        this.equipement.enabled=!this.equipement.enabled;
        this.composantPreTraitForm.controls['enabled'].setValue(!this.composantPreTraitForm.get('enabled'));
    }

    onSave(): void {

        const equipement = this.composantPreTraitForm.getRawValue();

        this.composantService.saveEquipementStationTraitement(equipement,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
