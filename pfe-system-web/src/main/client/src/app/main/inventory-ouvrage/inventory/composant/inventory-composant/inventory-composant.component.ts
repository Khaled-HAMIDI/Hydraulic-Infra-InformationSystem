import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {componentInventory} from "../model/componentInventory.model";
import {InventoryStepperService} from "../inventory-stepper/inventory-stepper.service";
import {Ouvrage} from "../../../../model/ouvrage.model";

@Component({
  selector: 'app-inventory-composant',
  templateUrl: './inventory-composant.component.html',
  styleUrls: ['./inventory-composant.component.scss'],
    animations: fuseAnimations
})
export class InventoryComposantComponent implements OnInit{

    private _unsubscribeAll: Subject<any>;
    exist:boolean;
    componentInventoryForm: FormGroup;
    components : componentInventory[];
    component : componentInventory;
    componentAdd :componentInventory;

    @Input() typeComponent: string ;
    @Output() validateEvent = new EventEmitter<string>();

    constructor(
        private formBuilder: FormBuilder,
        private router :Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService,
        private inventoryStepperService :InventoryStepperService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.component = new componentInventory();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.components = response.data[0];
                this.initForm();
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createForm(composant): FormGroup {
        let obj = {
            state:[composant.state,Validators.required],
            ecart:[composant.gap,Validators.required],
            observation:[composant.observation]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){

        if(this.checkTypeComponents(this.components)) {
            this.component = new componentInventory(this.checkTypeComponents(this.components));
            this.componentInventoryForm = this.createForm(this.component);
        }
        else this.exist=false;
    }


    checkTypeComponents(components):componentInventory{
        for (var i in components){
            if (components[i].componentType == this.typeComponent) return components[i];
        }
        return null;
    }

    onSave(): void {
        const formComponent = this.componentInventoryForm.getRawValue();
        this.componentAdd = new  componentInventory();

        this.componentAdd.componentType = this.typeComponent;
        this.componentAdd.gap = formComponent.ecart;
        this.componentAdd.observation = formComponent.observation;
        this.componentAdd.state = formComponent.state;
        this.componentAdd.done = true;

        this.inventoryStepperService.saveInventoryComponent(this.componentAdd,this.route.snapshot.params['codeInventory'],this.route.snapshot.params['codeOuvrage'])
            .then((response) => {
                    console.log("It worked");
                    this.validateEvent.emit("to-next-step");
                },
                (error) => {
                    console.log("No")
                });
    }


}
