import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Agency } from '../../../model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';


const AGENCIES_API = API + '/agencies';

@Injectable({
    providedIn: 'root'
})

export class AgencyListService implements Resolve<any>{

    agencies: Agency[];
    agenciesByFilter: Agency[];
    agenciesSelected: string[];

    onAgenciesChanged: Subject<any>;
    onSelectedAgenciesChanged: BehaviorSubject<any>;



    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {

        this.agenciesByFilter = [];
        this.agenciesSelected = [];

        this.onAgenciesChanged = new Subject();
        this.onSelectedAgenciesChanged = new BehaviorSubject([]);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getAll(): Promise<Agency[]> {
        return new Promise((resolve, reject) => {
            this.http.get(AGENCIES_API)
                .subscribe((response: any) => {
                    this.agencies = response;
                    resolve(response);
                }, reject);
        });
    }

    delete(ids: String[]): Promise<Agency[]> {
        return new Promise((resolve, reject) => {
            this.http.request('delete', AGENCIES_API, { body: ids })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Selection function
    // -----------------------------------------------------------------------------------------------------
    toggleSelectedAgency(agency: Agency): void {
        const indexAgencySelected = this.agenciesSelected.indexOf(agency.id);
        indexAgencySelected == -1 ? this.selectAgency(agency.id) : this.deselectAgency(indexAgencySelected);
    }

    selectAgency(idAgency: string, onEvent = true) {
        this.agenciesSelected.push(idAgency);
        if (onEvent) this.onSelectedAgenciesChanged.next(this.agenciesSelected);
    }

    deselectAgency(indexAgencySelected: number, onEvent = true) {
        this.agenciesSelected.splice(indexAgencySelected, 1);
        if (onEvent) this.onSelectedAgenciesChanged.next(this.agenciesSelected);
    }

    selectAll(): void {
        const agenciesToSelect = this.agenciesByFilter.length ? this.agenciesByFilter : this.agencies;
        this.agenciesSelected = [];

        agenciesToSelect.forEach(agency => { this.selectAgency(agency.id, false); })

        this.onSelectedAgenciesChanged.next(this.agenciesSelected);
    }

    deselectAll(): void {
        this.agenciesSelected = [];
        this.onSelectedAgenciesChanged.next(this.agenciesSelected);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Delete function
    // -----------------------------------------------------------------------------------------------------
    deleteAgency(agency): void {
        this.toolsService.showProgressBar();

        this.delete([agency.id]).then(
            (response) => {

                const agencyIndex = this.agencies.indexOf(agency);
                const indexAgencySelected = this.agenciesSelected.indexOf(agency.id)

                this.deleteFromAgencies(agencyIndex);
                if (indexAgencySelected != -1) this.deselectAgency(indexAgencySelected);

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

    deleteFromAgencies(agencyIndex, onEvent = true) {
        this.agencies.splice(agencyIndex, 1);
        if (onEvent) this.onAgenciesChanged.next(this.agencies);
    }

    deleteSelectedAgencies(): void {
        this.toolsService.showProgressBar();

        this.delete(this.agenciesSelected).then(
            (response: any) => {
        
                this.deleteFromSelectedAgencies(this.agenciesSelected);
                this.onAgenciesChanged.next(this.agencies);
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

    deleteFromSelectedAgencies(ids_to_delete) {
        for (const agencyId of ids_to_delete) {
            const agency = this.agencies.find(_agency => {
                return _agency.id === agencyId;
            });
            this.deleteFromAgencies(this.agencies.indexOf(agency), false);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setAgenciesByFilter(agenciesByFilter: Agency[]) {
        this.agenciesByFilter = agenciesByFilter;
    }



    //-------------------------- add and edit services -------------------------------------------


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

        if (this.agenciesSelected.length)
            data = this.getAgenciesSelected();
        else if (this.agenciesByFilter.length)
            data = this.agenciesByFilter;
        else
            data = this.agencies;

        //remove reference
        data = JSON.parse(JSON.stringify(data));

        this.removeProperties(data, properties);

        /* generate a worksheet */
        var ws = XLSX.utils.json_to_sheet(data, { header: ["code"] });

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Agences");

        /* write workbook and force a download */
        XLSX.writeFile(wb, "Agences.xlsx");

        this.toolsService.hideProgressBar();
    }

    getAgenciesSelected() {
        var tab = [];

        for (var i = 0; i < this.agenciesSelected.length; i++) {
            const agency = this.agencies.find(element => {
                return element.id === this.agenciesSelected[i];
            });
            tab.push(agency);
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

}
