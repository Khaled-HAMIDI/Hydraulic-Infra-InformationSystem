import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {
    EquipementStationTraitement,
    GroupeElectrogene,
    PriseEau,
    StationPhp
} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-station-php',
  templateUrl: './station-php.component.html',
  styleUrls: ['./station-php.component.scss'],
    animations: fuseAnimations
})
export class StationPhpComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    stationPhp:StationPhp;
    stationPhpForm: FormGroup;

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
        this.stationPhp=new StationPhp();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.stationPhp = response.data.stationPhpData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['StationPHP'],
            puissance: [composant.puissance,Validators.required],
            hmt: [composant.hmt,Validators.required],
            nombre:[composant.nombre,Validators.required],
            debit: [composant.debit,Validators.required],
            cost:[composant.cost,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if (this.stationPhp) this.stationPhpForm = this.createForm(this.stationPhp);
            else this.exist=false;
        }
        else {
            this.stationPhp=new StationPhp();
            this.stationPhpForm = this.createForm(this.stationPhp);
        }
    }

    toggleExist(){
        this.add =true;
        this.exist =true;
        this.initForm('add');
    }

    onSave(): void {

        const stationPhp = this.stationPhpForm.getRawValue();

        this.composantService.saveStationPhp(stationPhp,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
