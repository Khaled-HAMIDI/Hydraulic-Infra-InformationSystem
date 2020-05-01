import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantAddEditService} from "../../composant-add-edit.service";
import {Subject} from "rxjs";
import {EquipementStationTraitement, PostChimique} from "../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-recyclage-eau-lavavge',
  templateUrl: './post-recyclage-eau-lavavge.component.html',
  styleUrls: ['./post-recyclage-eau-lavavge.component.scss'],
    animations: fuseAnimations
})
export class PostRecyclageEauLavavgeComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    poste:PostChimique;
    postRecyEauLavageForm: FormGroup;

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
        this.poste=new PostChimique();
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
            typeComposant: ['PosteChimique'],
            postType: ['RecyclageEauLavage'],
            lieuImplantation:[composant.lieuImplantation,Validators.required],
            type: [composant.type],
            form:[composant.form],
            dimension: [composant.dimension],
            number:[composant.number],
            dosagePompe:[composant.dosagePompe,Validators.required],
            modePompe:[composant.modePompe,Validators.required],
            statePompe: [composant.statePompe,Validators.required],
            typePompe:[composant.typePompe,Validators.required],
            debitPompe: [composant.debitPompe,Validators.required],
            hmtPompe:[composant.hmtPompe,Validators.required],
            puissancePompe: [composant.puissancePompe,Validators.required],
            nombrePompe:[composant.nombrePompe,Validators.required],
            fonctionnementPompe: [composant.fonctionnementPompe,Validators.required],
            pointInjectPompe: [composant.pointInjectPompe,Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            this.composantService.loadPostChimique(this.route.snapshot.params['code']).then(
                (composants) => {
                    if(this.typePost(composants)) {
                        this.poste = new PostChimique(this.typePost(composants));
                        this.postRecyEauLavageForm = this.createForm(this.poste);
                    }
                    else this.exist=false;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            this.poste=new PostChimique();
            this.poste.fonctionnementPompe=true;
            this.postRecyEauLavageForm = this.createForm(this.poste);
        }
    }

    typePost(composants):PostChimique{
        for (var i in composants){
            if (composants[i].postType =='RecyclageEauLavage') return composants[i];
        }
        return null;
    }

    toggleFonctionnementPompe(){
        this.poste.fonctionnementPompe=!this.poste.fonctionnementPompe;
        this.postRecyEauLavageForm.controls['fonctionnementPompe'].setValue(!this.postRecyEauLavageForm.get('fonctionnementPompe'));
    }

    onSave(): void {

        const post = this.postRecyEauLavageForm.getRawValue();

        this.composantService.savePostChimique(post,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }



}
