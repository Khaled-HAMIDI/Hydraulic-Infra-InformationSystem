import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { API } from 'config/api.config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { Role } from '../../../model/admin.model';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

const PROFILS_API = API + '/roles';

@Injectable({
    providedIn: 'root'
})

export class ProfilListService implements Resolve<any>{

    profils: Role[];
    profilsByFilter: Role[];
    profilsSelected: string[];

    onProfilsChanged: Subject<any>;
    onSelectedProfilsChanged: BehaviorSubject<any>;



    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {
        this.profilsByFilter = [];
        this.profilsSelected = [];
        this.onProfilsChanged = new Subject();
        this.onSelectedProfilsChanged = new BehaviorSubject([]);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getAll(): Promise<Role[]> {
        return new Promise((resolve, reject) => {
            this.http.get(PROFILS_API)
                .subscribe((response: any) => {
                    this.profils = response;
                    resolve(response);
                }, reject);
        });
    }


    delete(ids: String[]): Promise<Role[]> {
        return new Promise((resolve, reject) => {
            this.http.request('delete', PROFILS_API, { body: ids })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Selection function
    // -----------------------------------------------------------------------------------------------------
    toggleSelectedProfil(profil: Role): void {
        const indexProfilSelected = this.profilsSelected.indexOf(profil.id);
        indexProfilSelected == -1 ? this.selectProfil(profil.id) : this.deselectProfil(indexProfilSelected);
    }

    selectProfil(idProfil: string, onEvent = true) {
        this.profilsSelected.push(idProfil);
        if (onEvent) this.onSelectedProfilsChanged.next(this.profilsSelected);
    }

    deselectProfil(indexProfilSelected: number, onEvent = true) {
        this.profilsSelected.splice(indexProfilSelected, 1);
        if (onEvent) this.onSelectedProfilsChanged.next(this.profilsSelected);
    }

    selectAll(): void {
        const profilsToSelect = this.profilsByFilter.length ? this.profilsByFilter : this.profils;
        this.profilsSelected = [];

        profilsToSelect.forEach(profil => { 
            if(!profil.systemEntity)
            this.selectProfil(profil.id, false);
         })
        this.onSelectedProfilsChanged.next(this.profilsSelected);
    }

    deselectAll(): void {
        this.profilsSelected = [];
        this.onSelectedProfilsChanged.next(this.profilsSelected);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Delete function
    // -----------------------------------------------------------------------------------------------------
    deleteProfil(profil): void {
        if (profil.systemEntity) {
            this.toolsService.hideProgressBar();
            this.toolsService.showError('LIST.TOAST.error-delete-system-entity');
            return;
        }

        this.toolsService.showProgressBar();
        this.delete([profil.id]).then(
            (response) => {

                const profilIndex = this.profils.indexOf(profil);
                const indexProfilSelected = this.profilsSelected.indexOf(profil.id);

                this.deleteFromProfils(profilIndex);
                if (indexProfilSelected != -1) this.deselectProfil(indexProfilSelected);

                this.toolsService.hideProgressBar();
                this.toolsService.showSuccess('LIST.TOAST.success-delete');

            },
            (error) => {
                console.log(error);
                this.toolsService.hideProgressBar();
                this.toolsService.showError('LIST.TOAST.error-delete');
            }
        );
    }

    deleteFromProfils(profilIndex, onEvent = true) {
        this.profils.splice(profilIndex, 1);
        if (onEvent) this.onProfilsChanged.next(this.profils);
    }


    deleteSelectedProfils(): void {
        this.toolsService.showProgressBar();

        this.delete(this.profilsSelected).then(
            (response: any) => {

                this.deleteFromSelectedProfils(this.profilsSelected);
                this.onProfilsChanged.next(this.profils);
                this.deselectAll();

                this.toolsService.hideProgressBar();
                this.toolsService.showSuccess('LIST.TOAST.success-delete');

            },
            (error) => {
                console.log(error);
                this.toolsService.hideProgressBar();
                this.toolsService.showError('LIST.TOAST.error-delete');
            }
        );

    }

    deleteFromSelectedProfils(ids_to_delete) {
        for (const profilId of ids_to_delete) {
            const profil = this.profils.find(_profil => {
                return _profil.id === profilId;
            });
            if (!profil.systemEntity)
            this.deleteFromProfils(this.profils.indexOf(profil), false);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setProfilsByFilter(profilsByFilter: Role[]) {
        this.profilsByFilter = profilsByFilter;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getAll()
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    this.router.navigate(['**']);
                    resolve();
                }
            );
        });

    }


    exportDataXLS(properties) {
        var data;

        this.toolsService.showProgressBar();

        if (this.profilsSelected.length)
            data = this.getProfilsSelected();
        else if (this.profilsByFilter.length)
            data = this.profilsByFilter;
        else
            data = this.profils;

        //remove reference
        data = JSON.parse(JSON.stringify(data));

        this.removeProperties(data, properties);
        this.replacePorperty(data);

        /* generate a worksheet */
        var ws = XLSX.utils.json_to_sheet(data);

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Profils");

        /* write workbook and force a download */
        XLSX.writeFile(wb, "Profils.xlsx");

        this.toolsService.hideProgressBar();
    }

    getProfilsSelected() {
        var tab = [];

        for (var i = 0; i < this.profilsSelected.length; i++) {
            const profil = this.profils.find(element => {
                return element.id === this.profilsSelected[i];
            });
            tab.push(profil);
        }

        return tab;

    }

    removeProperties(data, properties) {

        data.forEach(element => {
            for (var i = 0; i < properties.length; i++) {
                delete element[properties[i]];
            }
        });
    }

    replacePorperty(data) {
        forEach(data, function (element) {
            element.authorities = map(element.authorities).join('/');
        });
    }

}

