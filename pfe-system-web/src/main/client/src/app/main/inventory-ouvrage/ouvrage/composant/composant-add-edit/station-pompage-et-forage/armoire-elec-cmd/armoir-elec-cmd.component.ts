import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {AntiBelier, ArmoireElectrique, BatimentElectrique} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-armoir-elec-cmd',
  templateUrl: './armoir-elec-cmd.component.html',
  styleUrls: ['./armoir-elec-cmd.component.scss'],
    animations: fuseAnimations
})
export class ArmoirElecCmdComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    armoire:ArmoireElectrique;
    armoirElecForm: FormGroup;

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
        this.armoire=new ArmoireElectrique();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.armoire = response.data.armoireData;
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['ArmoireElectrique'],
            puissance:[composant.puissance,Validators.required],
            number: [composant.number,Validators.required],
            state:[composant.state,Validators.required],
            observation:[composant.observation,Validators.required],
            marque:[composant.marque,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if(this.armoire) this.armoirElecForm = this.createForm(this.armoire);
            else this.exist=false;
        }
        else {
            this.armoire=new ArmoireElectrique();
            this.armoirElecForm = this.createForm(this.armoire);
        }
    }

    onSave(): void {

        const armoire = this.armoirElecForm.getRawValue();

        this.composantService.saveArmoire(armoire,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
