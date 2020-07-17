import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {BatimentElectrique, Security} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-batiment-electrique',
  templateUrl: './batiment-electrique.component.html',
  styleUrls: ['./batiment-electrique.component.scss'],
    animations: fuseAnimations
})
export class BatimentElectriqueComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    batiment:BatimentElectrique;
    batimentElectForm: FormGroup;

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
        this.batiment=new BatimentElectrique();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.batiment = response.data.batimentElectriqueData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['BatimentElectrique'],
            area: [composant.area,Validators.required],
            state: [composant.state,Validators.required],
            nature: [composant.nature,Validators.required],
            cost:[composant.cost,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if (this.batiment) this.batimentElectForm = this.createForm(this.batiment);
            else this.exist=false;
        }
        else {
            this.batiment=new BatimentElectrique();
            this.batimentElectForm = this.createForm(this.batiment);
        }
    }

    toggleExist(){
        this.add =true;
        this.exist =true;
        this.initForm('add');
    }

    onSave(): void {

        const batiment = this.batimentElectForm.getRawValue();

        this.composantService.saveBatimentElectrique(batiment,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }

}
