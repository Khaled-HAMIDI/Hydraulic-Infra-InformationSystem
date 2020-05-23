import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantSaveService} from "../../../composant-save.service";
import {Subject} from "rxjs";
import {EquipementStationTraitement, GroupeElectrogene, KitMembrane} from "../../../../../../model/composant.model";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-kit-membrane',
  templateUrl: './kit-membrane.component.html',
  styleUrls: ['./kit-membrane.component.scss'],
    animations: fuseAnimations
})
export class KitMembraneComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    add:boolean;
    kit:KitMembrane;
    kitMembraneForm: FormGroup;

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
        this.kit=new KitMembrane();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.action == 'edit') this.kit = response.data[3];
                this.initForm(response.action);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            typeComposant:['KitMembrane'],
            nombre: [composant.nombre,Validators.required],
            caracteristique: [composant.caracteristique,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(action){
        if (action == 'edit') {
            this.add=false;
            if (this.kit) this.kitMembraneForm = this.createForm(this.kit);
            else this.exist=false;
        }
        else {
            this.kit=new KitMembrane();
            this.kitMembraneForm = this.createForm(this.kit);
        }
    }

    onSave(): void {

        const kit = this.kitMembraneForm.getRawValue();

        this.composantService.saveKitMembrane(kit,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
