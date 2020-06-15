import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';
import * as XLSX from 'xlsx';
import {OuvrageInventory} from "./model/currentInventory.model";

const INVENTORY_API = API + '/inventory/ouvrages';
@Injectable({
    providedIn: 'root'
})
export class CurrentInventoryService implements Resolve<any> {

    ouvrages: OuvrageInventory[];
    ouvragesByFilter: OuvrageInventory[];
    ouvragesSelected: string[];

    onOuvragesChanged: Subject<any>;
    onSelectedOuvragesChanged: BehaviorSubject<any>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService
    ) {
        this.ouvragesByFilter = [];
        this.ouvragesSelected = [];
        this.onOuvragesChanged = new Subject();
        this.onSelectedOuvragesChanged = new BehaviorSubject([]);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getAll(): Promise<OuvrageInventory[]> {
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API)
                .subscribe((response: any) => {
                    this.ouvrages = response;
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    getTypes(){
        return new Promise((resolve, reject) => {
            this.http.get(API+"/ouvrage/type")
                .subscribe((response: any) => {
                    this.ouvrages = response;
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    getStatus(){
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API+"/status")
                .subscribe((response: any) => {
                    this.ouvrages = response;
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    getInventoryDate(){
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API+"/startdate")
                .subscribe((response: any) => {
                    this.ouvrages = response;
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    getInventoryOuvragesDate(){
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API+"/dates")
                .subscribe((response: any) => {
                    this.ouvrages = response;
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setOuvragesByFilter(ouvragesByFilter: any[]) {
        this.ouvragesByFilter = ouvragesByFilter;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getAll(),
                this.getTypes(),
                this.getStatus(),
                this.getInventoryOuvragesDate(),
                this.getInventoryDate()
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    //this.router.navigate(['**']);
                    resolve();
                }
            );
        });

    }
}
