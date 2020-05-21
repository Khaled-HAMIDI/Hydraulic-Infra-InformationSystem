import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {AntiBelier, EquipementHydroMeca, SoupapeDecharge} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-soupage-decharge',
  templateUrl: './soupage-decharge.component.html',
  styleUrls: ['./soupage-decharge.component.scss'],
    animations: fuseAnimations
})
export class SoupageDechargeComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    soupape:SoupapeDecharge;
    soupageDechargerForm: FormGroup;

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
        this.soupape=new SoupapeDecharge();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.soupape = response.data[14];
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

}


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['SoupapeDecharge'],
            marque:[composant.marque,Validators.required],
            type: [composant.type,Validators.required],
            presseionTarage:[composant.presseionTarage,Validators.required],
            presseionEtanchiete:[composant.presseionEtanchiete,Validators.required],
            presseionService:[composant.presseionService,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.soupape) this.soupageDechargerForm = this.createForm(this.soupape);
            else this.exist=false;
        }
        else {
            this.soupape=new SoupapeDecharge();
            this.soupageDechargerForm = this.createForm(this.soupape);
        }
    }

    onSave(): void {

        const soupape = this.soupageDechargerForm.getRawValue();

        this.composantService.saveSoupape(soupape,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
