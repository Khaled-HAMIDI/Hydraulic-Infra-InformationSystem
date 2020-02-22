import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Center } from '../../../model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';

const CENTER_API = API + '/centers';

@Injectable({
    providedIn: 'root'
})

export class CenterListService implements Resolve<any>{

    centers: Center[];
    centersByFilter: Center[];
    centersSelected: string[];

    onCentersChanged: Subject<any>;
    onSelectedCentersChanged: BehaviorSubject<any>;

    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {

        this.centersByFilter = [];
        this.centersSelected = [];
        this.onCentersChanged = new Subject();
        this.onSelectedCentersChanged = new BehaviorSubject([]);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getAll(): Promise<Center[]> {
        return new Promise((resolve, reject) => {
            this.http.get(CENTER_API)
                .subscribe((response: any) => {
                    this.centers = response;
                    resolve(response);
                }, reject);
        });
    }

    delete(ids: String[]): Promise<Center[]> {
        return new Promise((resolve, reject) => {
            this.http.request('delete', CENTER_API, { body: ids })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Selection function
    // -----------------------------------------------------------------------------------------------------
    toggleSelectedCenter(center: Center): void {
        const indexCenterSelected = this.centersSelected.indexOf(center.id);
        indexCenterSelected == -1 ? this.selectCenter(center.id) : this.deselectCenter(indexCenterSelected);
    }

    selectCenter(idCenter: string, onEvent = true) {
        this.centersSelected.push(idCenter);
        if (onEvent) this.onSelectedCentersChanged.next(this.centersSelected);
    }

    deselectCenter(indexCenterSelected: number, onEvent = true) {
        this.centersSelected.splice(indexCenterSelected, 1);
        if (onEvent) this.onSelectedCentersChanged.next(this.centersSelected);
    }

    selectAll(): void {
        const centersToSelect = this.centersByFilter.length ? this.centersByFilter : this.centers;
        this.centersSelected = [];

        centersToSelect.forEach(center => { this.selectCenter(center.id, false); })

        this.onSelectedCentersChanged.next(this.centersSelected);
    }

    deselectAll(): void {
        this.centersSelected = [];
        this.onSelectedCentersChanged.next(this.centersSelected);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Delete function
    // -----------------------------------------------------------------------------------------------------
    deleteCenter(center): void {
        this.toolsService.showProgressBar();

        this.delete([center.id]).then(
               (response) => {

                const centerIndex = this.centers.indexOf(center);
                const indexCenterSelected = this.centersSelected.indexOf(center.id)

                this.deleteFromCenters(centerIndex);
                if (indexCenterSelected != -1) this.deselectCenter(indexCenterSelected);

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

    deleteFromCenters(centerIndex, onEvent = true) {
        this.centers.splice(centerIndex, 1);
        if (onEvent) this.onCentersChanged.next(this.centers);
    }

    deleteSelectedCenters(): void {
        this.toolsService.showProgressBar();

        this.delete(this.centersSelected).then(
            (response: any) => {
        
                this.deleteFromSelectedCenters(this.centersSelected);
                this.onCentersChanged.next(this.centers);
                this.deselectAll();

                this.toolsService.hideProgressBar();
                this.toolsService.showSuccess('LIST.TOAST.success-delete');
            },
            (error) => {
                console.log(error);
                this.toolsService.hideProgressBar();
                this.toolsService.showError('LIST.TOAST.error-delete');            }
        );

    }

    deleteFromSelectedCenters(ids_to_delete) {
        for (const centerId of ids_to_delete) {
            const center = this.centers.find(_center => {
                return _center.id === centerId;
            });
            this.deleteFromCenters(this.centers.indexOf(center), false);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setCentersByFilter(centersByFilter: Center[]) {
        this.centersByFilter = centersByFilter;
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

        if (this.centersSelected.length)
            data = this.getCentersSelected();
        else if (this.centersByFilter.length)
            data = this.centersByFilter;
        else
            data = this.centers;

        //remove reference
        data = JSON.parse(JSON.stringify(data));

        this.removeProperties(data, properties);

        /* generate a worksheet */
        var ws = XLSX.utils.json_to_sheet(data, { header: ["code"] });

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Centers");

        /* write workbook and force a download */
        XLSX.writeFile(wb, "Centers.xlsx");

        this.toolsService.hideProgressBar();
    }

    getCentersSelected() {
        var tab = [];

        for (var i = 0; i < this.centersSelected.length; i++) {
            const center = this.centers.find(element => {
                return element.id === this.centersSelected[i];
            });
            tab.push(center);
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

