import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { InventoryAddService } from "./inventory-add.service";
import { User } from './inventory.model';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Inventory, generalType, AllOuvrages} from './model/inventory.model';


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
    users: User[];
    currentchef: any;


    searchTerm : string = '';
    AllOuvrages = [];
    filteredOuvrages = [];
    selectedOuvrages:any[];
    responsablesOuvrages:any[];


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
        this.selectedOuvrages = [];
        this.responsablesOuvrages = [];
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.users = sortBy(response.data[0], ['lastname', 'firstname']);
                this.initForm();
                this.classOuvrages(response.data[1]);
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

    classOuvrages(ouvrages){
        this.AllOuvrages = this.createAllOuvragesStructure();
        this.filteredOuvrages = this.createAllOuvragesStructure();

        ouvrages.forEach((ouvrage)=> {
            ouvrage.checked = false;
            switch (ouvrage.type) {

                case generalType.BriseCharge :
                    this.AllOuvrages[0].ouvrages.push(ouvrage);
                    this.filteredOuvrages[0].ouvrages.push(ouvrage);
                    if (ouvrage.checked)  this.filteredOuvrages[0].nbCheked++;
                    break;

                case generalType.Forage :
                    this.AllOuvrages[1].ouvrages.push(ouvrage);
                    this.filteredOuvrages[1].ouvrages.push(ouvrage);
                    if (ouvrage.checked)  this.filteredOuvrages[1].nbCheked++;
                    break;

                case generalType.Reservoir :
                    this.AllOuvrages[2].ouvrages.push(ouvrage);
                    this.filteredOuvrages[2].ouvrages.push(ouvrage);
                    if (ouvrage.checked)  this.filteredOuvrages[2].nbCheked++;
                    break;

                case generalType.StationPompage:
                    this.AllOuvrages[3].ouvrages.push(ouvrage);
                    this.filteredOuvrages[3].ouvrages.push(ouvrage);
                    if (ouvrage.checked)  this.filteredOuvrages[3].nbCheked++;
                    break;

                case generalType.StationTraitementConventionelle :
                    this.AllOuvrages[4].ouvrages.push(ouvrage);
                    this.filteredOuvrages[4].ouvrages.push(ouvrage);
                    if (ouvrage.checked)  this.filteredOuvrages[4].nbCheked++;
                    break;

                case generalType.StationTraitementNonConventionelle :
                    this.AllOuvrages[5].ouvrages.push(ouvrage);
                    this.filteredOuvrages[5].ouvrages.push(ouvrage);
                    if (ouvrage.checked)  this.filteredOuvrages[5].nbCheked++;
                    break;
            }
        })
    }

    createAllOuvragesStructure(){
        var allOuvrages : AllOuvrages[];
        allOuvrages = new Array();

        allOuvrages.push(new AllOuvrages(generalType.BriseCharge));
        allOuvrages.push(new AllOuvrages(generalType.Forage));
        allOuvrages.push(new AllOuvrages(generalType.Reservoir));
        allOuvrages.push(new AllOuvrages(generalType.StationPompage));
        allOuvrages.push(new AllOuvrages(generalType.StationTraitementConventionelle));
        allOuvrages.push(new AllOuvrages(generalType.StationTraitementNonConventionelle));
        return allOuvrages;
    }

    selectOuvrage(ouvrage,j){
        if(ouvrage.checked)
        {
            this.selectedOuvrages.push(ouvrage);
            this.filteredOuvrages[j].nbCheked++;
        }
        else
        {
            this.selectedOuvrages.splice(this.selectedOuvrages.indexOf(ouvrage),1);
            this.filteredOuvrages[j].nbCheked--;
        }
    }

    filterOuvrageByTerm(i:number): void
    {
        const searchTerm = this.searchTerm.toLowerCase();
        console.log(searchTerm);
        // Search
        if ( searchTerm === '' )
        {
            this.filteredOuvrages[i].ouvrages = this.AllOuvrages[i].ouvrages;
        }
        else
        {
            this.filteredOuvrages[i].ouvrages = this.AllOuvrages[i].ouvrages.filter((ouvrage) => {
                return (ouvrage.name.toLowerCase().includes(searchTerm) || ouvrage.code.toLowerCase().includes(searchTerm) );
            });
        }
    }

    changeCurrentChef(IdCurrentChef) {
        this.currentchef = find(this.users, { 'id': IdCurrentChef })
    }

    setOuvrageResponsable(IdResponsable,codeOuvrage) {
        this.responsablesOuvrages =this.responsablesOuvrages.filter(ouvrageResponsable => ouvrageResponsable.ouvrage != codeOuvrage);
        this.responsablesOuvrages.push({ouvrage:codeOuvrage,responsable:IdResponsable});
    }

    onSave(): void {

        console.log(this.responsablesOuvrages);

        const inventory = this.inventoryForm.getRawValue();
        this.inventoryAdd = new Inventory();

        this.inventoryAdd.date = inventory.date;
        this.inventoryAdd.responsable = this.currentchef.id;
        this.inventoryAdd.code = inventory.code;
        this.inventoryAdd.completed = false;
        this.inventoryAdd.responsablesOuvrage = this.responsablesOuvrages;
        this.inventoryAddService.saveInventory(this.inventoryAdd)
            .then((response) => {
                    console.log("yesss");
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

