import {Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Chain} from './model/chain.model';
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
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTableDataSource } from '@angular/material/table';
import{allOuvrages} from './ouvrages'
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
    chainForm: FormGroup;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[];

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
        this.AllOuvrages = allOuvrages;
        this.displayedColumns =  COLUMN_NAMES;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.initForm(response.data[0], response.action);
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

    createChainForm(): FormGroup {

        let obj = {
            code: [this.chain.code],
            name: [this.chain.name, Validators.required],
            ouvrages: [this.chain.ouvrages]
        };

        return this.formBuilder.group(obj);
    }

    onSave(): void {
        const chain = this.chainForm.getRawValue();
        delete chain.ouvrages;
        // var permissionIds = [];
        // // this.chain.ouvrages.forEach((perm) => { permissionIds.push(perm.id) });
        // this.AllOuvrages.forEach((perm)=>{
        //     if(perm.checked) permissionIds.push(perm.id)
        //     else {
        //         if(perm.children)
        //         {
        //             perm.children.forEach((perm)=> {
        //                 if(perm.checked) permissionIds.push(perm.id)
        //             })
        //         }
        //     }
        // })
        // chain.ouvrages = permissionIds;

        this.chainAddEditService.saveChain(chain)
            .then(() => {

                if (chain.id) {
                    this.router.navigate(['/patrimony/chains/list']);
                }
                else {
                    this.router.navigate(['/patrimony/chains/list']);
                }
            });
    }


    initForm(chain, type) {

        if (type == 'edit') {
            this.chain = new Chain(chain);
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

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}




