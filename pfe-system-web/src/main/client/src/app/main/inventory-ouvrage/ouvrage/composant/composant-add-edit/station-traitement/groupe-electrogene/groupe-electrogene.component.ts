import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {BatimentElectrique, EquipementStationTraitement, GroupeElectrogene} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-groupe-electrogene',
  templateUrl: './groupe-electrogene.component.html',
  styleUrls: ['./groupe-electrogene.component.scss'],
    animations: fuseAnimations
})
export class GroupeElectrogeneComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    groupe:GroupeElectrogene;
    groupeElectrogeneForm: FormGroup;

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
        this.groupe=new GroupeElectrogene();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.groupe = response.data.groupeElectrogeneData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['GroupeElectrogene'],
            puissance: [composant.puissance,Validators.required],
            cuve: [composant.cuve,Validators.required],
            number:[composant.number,Validators.required],
            nature: [composant.nature,Validators.required],
            cost:[composant.cost,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if (this.groupe) this.groupeElectrogeneForm = this.createForm(this.groupe);
            else this.exist=false;
        }
        else {
            this.groupe=new GroupeElectrogene();
            this.groupeElectrogeneForm = this.createForm(this.groupe);
        }
    }

    toggleExist(){
        this.add =true;
        this.exist =true;
        this.initForm('add');
    }

    onSave(): void {

        const groupe = this.groupeElectrogeneForm.getRawValue();

        this.composantService.saveGroupeElectrogene(groupe,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
