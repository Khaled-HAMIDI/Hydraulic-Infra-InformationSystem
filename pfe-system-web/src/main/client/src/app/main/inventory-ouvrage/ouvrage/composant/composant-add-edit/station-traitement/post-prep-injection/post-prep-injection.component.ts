import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {EquipementStationTraitement, PostChimique} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-prep-injection',
  templateUrl: './post-prep-injection.component.html',
  styleUrls: ['./post-prep-injection.component.scss'],
    animations: fuseAnimations
})
export class PostPrepInjectionComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    poste:PostChimique;
    postes : PostChimique[];
    postPrepInjectForm: FormGroup;

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
        this.poste=new PostChimique();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.postes = response.data.postChimiqueData;
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
            postType: ['PreparationInjection'],
            lieuImplantation:[composant.lieuImplantation],
            type: [composant.type,Validators.required],
            form:[composant.form,Validators.required],
            dimension: [composant.dimension,Validators.required],
            number:[composant.number,Validators.required],
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

            if(this.typePost(this.postes)) {
                this.poste = new PostChimique(this.typePost(this.postes));
                this.postPrepInjectForm = this.createForm(this.poste);
            }
            else this.exist=false;
        }
        else {
            this.poste=new PostChimique();
            this.poste.fonctionnementPompe=true;
            this.postPrepInjectForm = this.createForm(this.poste);
        }
    }

    typePost(composants):PostChimique{
        for (var i in composants){
            if (composants[i].postType =='PreparationInjection') return composants[i];
        }
        return null;
    }

    toggleFonctionnementPompe(){
        this.poste.fonctionnementPompe=!this.poste.fonctionnementPompe;
        this.postPrepInjectForm.controls['fonctionnementPompe'].setValue(!this.postPrepInjectForm.get('fonctionnementPompe'));
    }


    onSave(): void {

        const post = this.postPrepInjectForm.getRawValue();

        this.composantService.savePostChimique(post,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
