import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantAddEditService} from "../../composant-add-edit.service";
import {Subject} from "rxjs";
import {EquipementHydroMeca} from "../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-echelle',
  templateUrl: './echelle.component.html',
  styleUrls: ['./echelle.component.scss'],
    animations: fuseAnimations
})
export class EchelleComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    equipement:EquipementHydroMeca;
    equipementHydroMecaForm: FormGroup;

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
        this.equipement=new EquipementHydroMeca();
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
            typeComposant:['ComposantHydroMecanique'],
            equipementType:['Echellle'],
            dn: [composant.dn,Validators.required],
            pn:[composant.pn,Validators.required],
            state:[composant.state,Validators.required],
            materiaux:[composant.materiaux,Validators.required],
            lieuImplantation:[composant.lieuImplantation,Validators.required],
            type:[composant.type,Validators.required],
            number:[composant.number,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            this.composantService.loadHydroMeca(this.route.snapshot.params['code']).then(
                (composants) => {
                    if(this.typeEquipement(composants)) {
                        this.equipement = new EquipementHydroMeca(this.typeEquipement(composants));
                        this.equipementHydroMecaForm = this.createForm(this.equipement);
                    }
                    else this.exist=false;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            this.equipement=new EquipementHydroMeca();
            this.equipementHydroMecaForm = this.createForm(this.equipement);
        }
    }

    typeEquipement(composants):EquipementHydroMeca{
        for (var i in composants){
            if (composants[i].equipementType =='Echellle') return composants[i];
        }
        return null;
    }

    onSave(): void {

        const equipementHydroMeca = this.equipementHydroMecaForm.getRawValue();

        this.composantService.saveHydroMeca(equipementHydroMeca,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
