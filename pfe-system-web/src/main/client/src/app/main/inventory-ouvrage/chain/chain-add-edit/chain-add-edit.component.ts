import {Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Chain, generalType, AllOuvrages} from './model/chain.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ChainAddEditService } from './chain-add-edit.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { pullAllWith, sortBy } from 'lodash-es';
import { isEqual } from 'date-fns';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Authority } from 'app/main/model/admin.model';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatTreeNestedDataSource } from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
const COLUMN_NAMES: string[] = [
    'type',
    'ouvrage',
  ];


/* A appliquer pour le code des chains
const REGX_CODE = "^[a-zA-Z0-9]{2}$";*/

@Component({
  selector: 'app-chain-add-edit',
  templateUrl: './chain-add-edit.component.html',
  styleUrls: ['./chain-add-edit.component.scss'],
    animations: fuseAnimations
})

export class ChainAddEditComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    chain: Chain;
    allPermissions=[];
    pageType: string;
    AllOuvrages = [];
    filteredOuvrages = [];
    searchTerm : string = '';
    chainForm: FormGroup;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[];
    selectedOuvrages:any[]
    constructor(
        private chainAddEditService: ChainAddEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.chain = new Chain();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.displayedColumns =  COLUMN_NAMES;
        this.selectedOuvrages = [];
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[1]);
                this.initForm(response.data[0], response.action);
                this.classOuvrages(response.data[1],response.action);
                this.initTable(this.AllOuvrages);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initTable(columnData) {
        // Init DataSource
        this.dataSource = new MatTableDataSource(columnData);
    }

    classOuvrages(ouvrages,type){
        this.AllOuvrages = this.createAllOuvragesStructure();
        this.filteredOuvrages = this.createAllOuvragesStructure();
        ouvrages.forEach((ouvrage)=> {
            if (type == 'edit'){
                var i = this.chain.ouvrages.findIndex((item)=>{
                    return item.code === ouvrage.code
                })
                if(i != -1)
                {
                    ouvrage.checked = true;
                    this.selectedOuvrages[this.chain.ouvrages[i].position] = ouvrage;
                }
                else
                ouvrage.checked = false;
            }
            else
            ouvrage.checked = false;
            if(ouvrage.type === generalType.BriseCharge)
            {
                this.AllOuvrages[0].ouvrages.push(ouvrage);
                this.filteredOuvrages[0].ouvrages.push(ouvrage);
            }
            if(ouvrage.type === generalType.Forage)
            {
                this.AllOuvrages[1].ouvrages.push(ouvrage)
                this.filteredOuvrages[1].ouvrages.push(ouvrage)
            }
            if(ouvrage.type === generalType.Reservoir)
            {
                this.AllOuvrages[2].ouvrages.push(ouvrage)
                this.filteredOuvrages[2].ouvrages.push(ouvrage)
            }
            if(ouvrage.type === generalType.StationPompage)
            {
                this.AllOuvrages[3].ouvrages.push(ouvrage)
                this.filteredOuvrages[3].ouvrages.push(ouvrage)
            }
            if(ouvrage.type === generalType.StationTraitementConventionelle)
            {
                this.AllOuvrages[4].ouvrages.push(ouvrage)
                this.filteredOuvrages[4].ouvrages.push(ouvrage)
            }
            if(ouvrage.type === generalType.StationTraitementNonConventionelle)
            {
                this.AllOuvrages[5].ouvrages.push(ouvrage)
                this.filteredOuvrages[5].ouvrages.push(ouvrage)
            }
        })
    }
    createAllOuvragesStructure(){
        var allOuvrages : AllOuvrages[]
        allOuvrages = new Array();
        allOuvrages.push(new AllOuvrages(generalType.BriseCharge));
        allOuvrages.push(new AllOuvrages(generalType.Forage));
        allOuvrages.push(new AllOuvrages(generalType.Reservoir));
        allOuvrages.push(new AllOuvrages(generalType.StationPompage));
        allOuvrages.push(new AllOuvrages(generalType.StationTraitementConventionelle));
        allOuvrages.push(new AllOuvrages(generalType.StationTraitementNonConventionelle));
        return allOuvrages;
    }

    createChainForm(): FormGroup {

        let obj = {
            id: [this.chain.id],
            code: [this.chain.code],
            name: [this.chain.name, Validators.required],
            ouvrages: [this.chain.ouvrages]
        };

        return this.formBuilder.group(obj);
    }

    selectOuvrage(ouvrage){
        if(ouvrage.checked)
        this.selectedOuvrages.push(ouvrage);
        else
        this.selectedOuvrages.splice(this.selectedOuvrages.indexOf(ouvrage),1);
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

    onSave(): void {
        const chain = this.chainForm.getRawValue();
        delete chain.ouvrages;
        var ouvragesIds = [];
        this.selectedOuvrages.forEach((ouv) => { ouvragesIds.push(ouv.code) });
        chain.ouvrages = ouvragesIds;
        console.log(chain);
        this.chainAddEditService.saveChain(chain)
            .then(() => {

                if (chain.id) {
                    this.router.navigate(['/patrimony/chain/list']);
                }
                else {
                    this.router.navigate(['/patrimony/chain/list']);
                }
            });
    }


    initForm(chain, type) {

        if (type == 'edit') {
            this.chain = new Chain(chain);
            this.selectedOuvrages = new Array(this.chain.ouvrages.length)
            this.allPermissions = pullAllWith(this.allPermissions, this.chain.ouvrages, isEqual);
        } else {
            this.chain = new Chain();
        }

        this.pageType = type;
        this.chainForm = this.createChainForm();
        this.initFilteredPermissions();
    }


    // Chips
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredPermissions: Observable<Authority[]>;

    @ViewChild('chainInput', { static: false }) chainInput: ElementRef;

    initFilteredPermissions() {
        this.filteredPermissions = this.chainForm.get('ouvrages').valueChanges.pipe(
            startWith(''),
            map((filterValue: string | null) => {
                return filterValue ? this._filter(filterValue) : sortBy(this.allPermissions.slice(), ['description']);
            }));
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;

        if (input) {
            input.value = '';
        }

        this.chainForm.get('ouvrages').setValue(null);
    }

    remove(permission: Authority): void {
        const index = this.chain.ouvrages.indexOf(permission);

        if (index >= 0) {
            this.chain.ouvrages.splice(index, 1);
            this.allPermissions.push(permission);
        }
        this.chainForm.get('ouvrages').setValue(null);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        let permission = event.option.value;

        this.chain.ouvrages.push(permission);
        this.removeFromAllOuvrages(permission);

        this.chainForm.get('ouvrages').setValue(null);
    }

    parentSelect(node) {
        let permission: Authority = new Authority(node)
        if (node.children) {
            const ind = this.AllOuvrages.findIndex((item) => {
                return item.id === permission.id;
            });
            this.AllOuvrages[ind].children.map((per) => {
                return per.checked = node.checked
            })
        }
    }

    childSelect(node) {
        let permission: Authority = new Authority(node)
        // if (node.checked)
        //     this.chain.ouvrages.push(permission)
        // else {
        //     const index = this.chain.ouvrages.findIndex((item) => {
        //         return item.id === permission.id;
        //     });
        //     if(index >= 0)
        //     this.chain.ouvrages.splice(index, 1);
        // }
        // /* check parent if all child checked */
         const i = this.findChildParent(node)
        if (this.AllChildSeleted(this.AllOuvrages[i]))
        {
            this.AllOuvrages[i].checked = true;
        }else{
            this.AllOuvrages[i].checked = false;
        }
    }

    findChildParent(node): number{
       let found = false
       const index =  this.AllOuvrages.findIndex((item)=> {
            item.children.forEach((child)=>{
                if(child.id === node.id) 
                found = true;
            })
            return found;
        })
        return index;
    }
    AllChildSeleted(node){
       return node.children.every((child)=>{
            return child.checked===true
        })
    }
    AtLeastOneSelected():boolean{
       let thereIsOne = false
        this.AllOuvrages.forEach((perm)=>{
            if(perm.checked) return thereIsOne=true;
            if(perm.children) perm.children.forEach((child)=> {if(child.checked) return thereIsOne=true})
       })
        return thereIsOne;
    }

    removeFromAllOuvrages(permission: Authority) {
        const index = this.allPermissions.indexOf(permission);

        if (index >= 0) {
            this.allPermissions.splice(index, 1);
        }
    }

    private _filter(value: any): Authority[] {
        const filterValue = value.description ? value.description.toLowerCase() : value.toLowerCase();

        return this.allPermissions.filter(
            permission => permission.description.toLowerCase().includes(filterValue)
        );
    }

    permisionsValidator(): ValidatorFn {

        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = this.AtLeastOneSelected();
            return !forbidden ? { 'forbiddenName': { value: this.chain } } : null;
        };
    }
    drop(event: CdkDragDrop<string[]>,i) {
        moveItemInArray(this.selectedOuvrages, event.previousIndex, event.currentIndex);
      }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}




