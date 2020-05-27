import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {AntiBelier, EquipementHydroMeca, PosteChloration} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-poste-chloration',
  templateUrl: './poste-chloration.component.html',
  styleUrls: ['./poste-chloration.component.scss'],
    animations: fuseAnimations
})
export class PosteChlorationComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    poste:PosteChloration;
    postChlorationForm: FormGroup;

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
        this.poste=new PosteChloration();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.poste = response.data.postChlorationData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['PosteChloration'],
            abri: [composant.abri,Validators.required],
            type:[composant.type,Validators.required],
            dimension: [composant.dimension,Validators.required],
            dosagePompe:[composant.dosagePompe,Validators.required],
            statePompe: [composant.statePompe,Validators.required],
            typePompe:[composant.typePompe,Validators.required],
            debitPompe: [composant.debitPompe,Validators.required],
            hmtPompe:[composant.hmtPompe,Validators.required],
            puissancePompe: [composant.puissancePompe,Validators.required],
            nombrePompe:[composant.nombrePompe,Validators.required],
            fonctionnementPompe: [composant.fonctionnementPompe,Validators.required],
            pointInjectPompe: [composant.pointInjectPompe],
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.poste) this.postChlorationForm = this.createForm(this.poste);
            else this.exist=false;
        }
        else {
            this.poste=new PosteChloration();
            this.poste.fonctionnementPompe=true;
            this.poste.abri=true;
            this.postChlorationForm = this.createForm(this.poste);
        }
    }

    toggleExist(){
        this.add =true;
        this.exist =true;
        this.initForm('add');
    }

    onSave(): void {

        const postChloration = this.postChlorationForm.getRawValue();

        this.composantService.savePostChloration(postChloration,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }

    toggleAbri(){
        this.poste.abri=!this.poste.abri;
        this.postChlorationForm.controls['abri'].setValue(!this.postChlorationForm.get('abri'));
    }

    toggleFonctionnementPompe(){
        this.poste.fonctionnementPompe=!this.poste.fonctionnementPompe;
        this.postChlorationForm.controls['fonctionnementPompe'].setValue(!this.postChlorationForm.get('fonctionnementPompe'));
    }


}
