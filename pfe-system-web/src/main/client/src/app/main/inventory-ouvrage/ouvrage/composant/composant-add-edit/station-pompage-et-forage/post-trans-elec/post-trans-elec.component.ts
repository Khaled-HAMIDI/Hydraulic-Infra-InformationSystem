import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {AntiBelier, EquipementHydroMeca, PosteTransformationElectrique} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-trans-elec',
  templateUrl: './post-trans-elec.component.html',
  styleUrls: ['./post-trans-elec.component.scss'],
    animations: fuseAnimations
})
export class PostTransElecComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    poste:PosteTransformationElectrique;
    postTransElecForm: FormGroup;

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
        this.poste=new PosteTransformationElectrique();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.poste = response.data.postTrandformationElectriqueData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['PosteTransformationElectrique'],
            marque: [composant.marque,Validators.required],
            puissance: [composant.puissance,Validators.required],
            couplage:[composant.couplage,Validators.required],
            up: [composant.up,Validators.required],
            is: [composant.is ,Validators.required],
            ucc:[composant.ucc,Validators.required],
            natureHuile:[composant.natureHuile,Validators.required],
            natureAbri: [composant.natureAbri,Validators.required],
            pmt: [composant.pmt,Validators.required],
            pbt:[composant.pbt,Validators.required],
            pmd: [composant.pmd,Validators.required],
            tarif: [composant.tarif ,Validators.required],
            pma:[composant.pma,Validators.required],
            typeComptage:[composant.typeComptage,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.poste) this.postTransElecForm = this.createForm(this.poste);
            else this.exist=false;
        }
        else {
            this.poste=new PosteTransformationElectrique();
            this.postTransElecForm = this.createForm(this.poste);
        }
    }

    onSave(): void {

        const post = this.postTransElecForm.getRawValue();

        this.composantService.savePostTrandformationElectrique(post,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
