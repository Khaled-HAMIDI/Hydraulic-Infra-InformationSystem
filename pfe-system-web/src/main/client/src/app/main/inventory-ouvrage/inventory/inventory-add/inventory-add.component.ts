import {Component, OnInit} from '@angular/core';
import {Ouvrage} from '../../../model/ouvrage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {InventoryAddService} from "./inventory-add.service";
import {Inventory} from "../../../model/inventory.model";


@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss'],
    animations: fuseAnimations
})
export class InventoryAddComponent implements OnInit {

    inventory: Inventory;
    inventoryAdd :Inventory;
    inventoryForm: FormGroup;

    constructor(
        private inventoryAddService: InventoryAddService,
        private formBuilder: FormBuilder,
        private router :Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
) {
        // Set the default
        this.inventory = new Inventory();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.initForm();

}

    createInventoryForm(): FormGroup {
        let obj = {
            code: [this.inventory.code,Validators.required],
            responsable: [this.inventory.responsable,Validators.required],
            date: [this.inventory.date,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.inventory = new Inventory();
        this.inventoryForm = this.createInventoryForm();
    }



    onSave(): void {
        const invent = this.inventoryForm.getRawValue();
        this.inventoryAdd = new Inventory();

        this.inventoryAdd.date = invent.date;
        this.inventoryAdd.responsable = invent.responsable;
        this.inventoryAdd.code = invent.code;
        this.inventoryAdd.completed = false;

        console.log(this.inventoryAdd);
        this.inventoryAddService.saveInventory(this.inventoryAdd)
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });

}

}

