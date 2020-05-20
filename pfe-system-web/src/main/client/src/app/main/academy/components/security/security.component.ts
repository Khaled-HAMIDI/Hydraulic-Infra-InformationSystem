import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import { Security } from 'app/main/model/composant.model';
import { ComposantSaveService } from 'app/main/inventory-ouvrage/ouvrage/composant/composant-save.service';


@Component({
  selector: 'testapp-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
    animations: fuseAnimations
})
export class TestSecurityComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    security:Security;
    securityForm: FormGroup;

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
        this.security=new Security();

    }

    /**
     * On init
     */
    ngOnInit(): void {

        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.security = response.data[0];
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );
    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['Security'],
            state: [composant.state,Validators.required],
            closing: [composant.closing,Validators.required],
            telsurveillance:[composant.telsurveillance,Validators.required],
            guerites: [composant.guerites,Validators.required],
            agents: [composant.agents,Validators.required],
            nature:[composant.nature,Validators.required],
            armement:[composant.armement,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.security) this.securityForm = this.createForm(this.security);
            else this.exist=false;
        }
        else {
            this.security=new Security();
            this.security.armement=true;
            this.security.closing=true;
            this.security.telsurveillance=true;
            this.securityForm = this.createForm(this.security);
        }
    }

    onSave(): void {
        this.validateEvent.emit("to-next-step");
        // const security = this.securityForm.getRawValue();
        // console.log(security);

        // this.composantService.saveSecurity(security,this.route.snapshot.params['code'])
        //     .then((response) => {
        //             console.log("It worked");
        //             this.validateEvent.emit("to-next-step");
        //         },
        //         (error) => {
        //             console.log("No")
        //         });
    }


    toggleClosing(){
        this.security.closing=!this.security.closing;
        this.securityForm.controls['closing'].setValue(!this.securityForm.get('closing'));
    }

    toggleTelesurveillance(){
        this.security.telsurveillance=!this.security.telsurveillance;
        this.securityForm.controls['telsurveillance'].setValue(!this.securityForm.get('telsurveillance'));
    }

    toggleArmement(){
        this.security.armement=!this.security.armement;
        this.securityForm.controls['armement'].setValue(!this.securityForm.get('armement'));

    }

}
