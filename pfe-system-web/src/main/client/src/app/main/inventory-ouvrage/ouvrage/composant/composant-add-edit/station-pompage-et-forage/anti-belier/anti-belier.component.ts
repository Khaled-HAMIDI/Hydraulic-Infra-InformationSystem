import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {AntiBelier, BatimentElectrique, StationPhp} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-anti-belier',
  templateUrl: './anti-belier.component.html',
  styleUrls: ['./anti-belier.component.scss'],
    animations: fuseAnimations
})
export class AntiBelierComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    antiBelier:AntiBelier;
    antiBelierForm: FormGroup;


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
        this.antiBelier=new AntiBelier();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.antiBelier = response.data[13];
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['AntiBelier'],
            marque:[composant.marque,Validators.required],
            type: [composant.type,Validators.required],
            capacity:[composant.type,Validators.required],
            compresseur:[composant.compresseur ,Validators.required],
            presseionService:[composant.presseionService,Validators.required],
            presseionEpreuve:[composant.presseionEpreuve,Validators.required],
            presseionRegonflage: [composant.presseionRegonflage,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.antiBelier) this.antiBelierForm = this.createForm(this.antiBelier);
            else this.exist=false;
        }
        else {
            this.antiBelier=new AntiBelier();
            this.antiBelier.compresseur=true;
            this.antiBelierForm = this.createForm(this.antiBelier);
        }
    }

    onSave(): void {

        const antiBelier = this.antiBelierForm.getRawValue();

        this.composantService.saveAntiBelier(antiBelier,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }

    toggleCompresseur(){
        this.antiBelier.compresseur=!this.antiBelier.compresseur;
        this.antiBelierForm.controls['compresseur'].setValue(!this.antiBelierForm.get('compresseur'));
    }

}
