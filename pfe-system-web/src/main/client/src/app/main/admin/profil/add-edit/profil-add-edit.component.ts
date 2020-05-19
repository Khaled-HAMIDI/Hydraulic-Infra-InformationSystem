import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Role, Authority } from '../../../model/admin.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { ProfilAddEditService } from './profil-add-edit.service';
import sortBy from 'lodash/sortBy';
import pullAllWith from 'lodash/pullAllWith';
import isEqual from 'lodash/isEqual';
import { AllPermissions,AuthorityTab,Domains } from './permission'
import { MatTableDataSource } from '@angular/material/table';
const COLUMN_NAMES: string[] = [
    'domain',
    'action'
  ];
@Component({
    selector: 'profil-add-edit',
    templateUrl: './profil-add-edit.component.html',
    styleUrls: ['./profil-add-edit.component.scss'],
    animations: fuseAnimations
})

export class ProfilAddEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    profil: Role;
    allPermissions: Authority[];
    pageType: string;
    profilForm: FormGroup;
    AllPermissions = []
    dataSource : MatTableDataSource<any>;
    displayedColumns: string[];
    selectedOuvrages:any[];
    domains : string [];

    constructor(
        private profilAddEditService: ProfilAddEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.profil = new Role();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.AllPermissions = AllPermissions;
        this.displayedColumns =  COLUMN_NAMES;
        this.domains = []
    }

    hasChild = (_: number, node) => !!node.children && node.children.length > 0;

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[1]);
                this.allPermissions = response.data[1];
                this.initForm(response.data[0], response.action);
                this.classAuthorities(response.data[1]);
                this.initTable(this.AllPermissions);
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
    createAuthorityStructure(authorities){
        let i = -1;
        var permissions : AuthorityTab [];
        permissions = new Array();
        authorities = sortBy(authorities,['domain'])
        authorities.forEach((authority)=>{
            if(authority.domain !== null)
            if(!this.domains.includes(authority.domain))
            {
                i++;
                this.domains.push(authority.domain)
                permissions.push(new AuthorityTab(authority.domain));
                permissions[i].children.push(authority)
            }
            else {
                permissions[i].children.push(authority)
            }
        })
        console.log(permissions);
        return permissions;
    }
    classAuthorities(authorities){
        this.AllPermissions = this.createAuthorityStructure(authorities);

    }
    createProfilForm(): FormGroup {

        let obj = {
            id: [this.profil.id],
            role: [this.profil.role, Validators.required],
            designation: [this.profil.designation, Validators.required],
            authorities: [this.profil.authorities]
        };

        return this.formBuilder.group(obj);
    }

    onSave(): void {
        const profil = this.profilForm.getRawValue();
        var permissionIds = [];
        // this.profil.authorities.forEach((perm) => { permissionIds.push(perm.id) });
        this.AllPermissions.forEach((perm)=>{
            if(perm.checked) permissionIds.push(perm.id)
            else {
                if(perm.children)
                {
                    perm.children.forEach((perm)=> {
                        if(perm.checked) permissionIds.push(perm.id)
                    })
                }
            }
        })
        if(permissionIds.includes('*:*'))
        profil.authorities.push('*:*');
        profil.authorities = permissionIds;
  
        this.profilAddEditService.saveProfil(profil)
            .then(() => {

                if (profil.id) {
                    this.router.navigate(['/admin/profils']);
                }
                else {
                    this.router.navigate(['/admin/profils']);
                }
            });
    }


    initForm(profil, type) {

        if (type == 'edit') {
            this.profil = new Role(profil);
            this.allPermissions = pullAllWith(this.allPermissions, this.profil.authorities, isEqual);
        } else {
            this.profil = new Role();
        }

        this.pageType = type;
        this.profilForm = this.createProfilForm();
        this.initFilteredPermissions();
    }


    // Chips
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredPermissions: Observable<Authority[]>;

    @ViewChild('profilInput', { static: false }) profilInput: ElementRef;

    initFilteredPermissions() {
        this.filteredPermissions = this.profilForm.get('authorities').valueChanges.pipe(
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

        this.profilForm.get('authorities').setValue(null);
    }

    remove(permission: Authority): void {
        const index = this.profil.authorities.indexOf(permission);

        if (index >= 0) {
            this.profil.authorities.splice(index, 1);
            this.allPermissions.push(permission);
        }
        this.profilForm.get('authorities').setValue(null);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        let permission = event.option.value;

        this.profil.authorities.push(permission);
        this.removeFromAllPermissions(permission);

        this.profilForm.get('authorities').setValue(null);
    }

    parentSelect(node) {
        let permission: Authority = new Authority(node)
        if (node.children) {
            const ind = this.AllPermissions.findIndex((item) => {
                return item.id === permission.id;
            });
            this.AllPermissions[ind].children.map((per) => {
                return per.checked = node.checked
            })
        }
    }

    childSelect(node) {
        let permission: Authority = new Authority(node)
        // if (node.checked)
        //     this.profil.authorities.push(permission)
        // else {
        //     const index = this.profil.authorities.findIndex((item) => {
        //         return item.id === permission.id;
        //     });
        //     if(index >= 0)
        //     this.profil.authorities.splice(index, 1);
        // }
        // /* check parent if all child checked */
         const i = this.findChildParent(node)
        if (this.AllChildSeleted(this.AllPermissions[i]))
        {
            this.AllPermissions[i].checked = true;
        }else{
            this.AllPermissions[i].checked = false;
        }
    }

    findChildParent(node): number{
       let found = false
       const index =  this.AllPermissions.findIndex((item)=> {
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
        this.AllPermissions.forEach((perm)=>{
            if(perm.checked) return thereIsOne=true;
            if(perm.children) perm.children.forEach((child)=> {if(child.checked) return thereIsOne=true})
       })
        return thereIsOne;
    }

    removeFromAllPermissions(permission: Authority) {
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
            return !forbidden ? { 'forbiddenName': { value: this.profil.authorities } } : null;
        };
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
