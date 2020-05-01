import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantAddEditService} from "../../composant-add-edit.service";
import {Subject} from "rxjs";
import {EquipementStationTraitement, GroupeElectrogene, PriseEau} from "../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-prise-eau',
  templateUrl: './prise-eau.component.html',
  styleUrls: ['./prise-eau.component.scss'],
    animations: fuseAnimations
})
export class PriseEauComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    priseEau:PriseEau;
    priseEauForm: FormGroup;

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
        this.priseEau=new PriseEau();
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
            typeComposant:['PriseEau'],
            type: [composant.type,Validators.required],
            dimension: [composant.dimension,Validators.required],
            nature:[composant.nature,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            this.composantService.loadPriseEau(this.route.snapshot.params['code']).then(
                (composant) => {
                    if(composant) {
                        this.priseEau = new PriseEau(composant);
                        this.priseEauForm = this.createForm(this.priseEau);
                    }
                    else this.exist=false;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            this.priseEau=new PriseEau();
            this.priseEauForm = this.createForm(this.priseEau);
        }
    }

    onSave(): void {

        const priseEau = this.priseEauForm.getRawValue();

        this.composantService.savePriseEau(priseEau,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
