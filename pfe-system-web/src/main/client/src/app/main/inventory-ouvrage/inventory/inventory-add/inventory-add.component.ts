import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ouvrage } from '../../../model/ouvrage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { InventoryAddService } from "./inventory-add.service";
import { Inventory } from "../../../model/inventory.model";
import { User } from './inventory.model';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-inventory-add',
    templateUrl: './inventory-add.component.html',
    styleUrls: ['./inventory-add.component.scss'],
    animations: fuseAnimations
})
export class InventoryAddComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    inventory: Inventory;
    inventoryAdd: Inventory;
    inventoryForm: FormGroup;
    headOfTheInvontories: User[];
    currentchef: any;

    constructor(
        private inventoryAddService: InventoryAddService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.inventory = new Inventory();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.headOfTheInvontories = sortBy(response.data[0], ['lastname', 'firstname']);
                this.initForm();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    createInventoryForm(): FormGroup {
        let obj = {
            code: [this.inventory.code, Validators.required],
            headOfTheInventory: [this.inventory.responsable, Validators.required],
            date: [this.inventory.date, Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    initForm() {
        this.inventory = new Inventory();
        this.inventoryForm = this.createInventoryForm();
    }

    changeCurrentChef(IdCurrentChef) {
        this.currentchef = find(this.headOfTheInvontories, { 'id': IdCurrentChef })
    }

    onSave(): void {
        const invent = this.inventoryForm.getRawValue();
        this.inventoryAdd = new Inventory();

        this.inventoryAdd.date = invent.date;
        this.inventoryAdd.responsable = this.currentchef.id;
        this.inventoryAdd.code = invent.code;
        this.inventoryAdd.completed = false;
        this.inventoryAddService.saveInventory(this.inventoryAdd)
            .then((response) => {
                this.router.navigate(['/']);
            },
                (error) => {
                    console.log("No")
                });

    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}

