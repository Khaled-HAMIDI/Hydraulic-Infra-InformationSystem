import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';
import * as XLSX from 'xlsx';
import { OuvrageList } from '../../../../model/ouvrage.model';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import { PrintReportsService } from '@ayams/services/print-reports.service';

const OUVRAGE_API = API + '/ouvrages/declassed';
@Injectable({
  providedIn: 'root'
})
export class OuvrageDeclassedListService implements Resolve<any> {
  ouvrages: OuvrageList[];
  ouvragesByFilter: OuvrageList[];
  ouvragesSelected: string[];

  onOuvragesChanged: Subject<any>;
  onSelectedOuvragesChanged: BehaviorSubject<any>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private toolsService: ToolsService,
    private printReportsService: PrintReportsService
  ) {
    this.ouvragesByFilter = [];
    this.ouvragesSelected = [];
    this.onOuvragesChanged = new Subject();
    this.onSelectedOuvragesChanged = new BehaviorSubject([]);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ API function
  // -----------------------------------------------------------------------------------------------------

  getAll(): Promise<OuvrageList[]> {
    return new Promise((resolve, reject) => {
      this.http.get(OUVRAGE_API)
        .subscribe((response: any) => {
          this.ouvrages = response;
          resolve(response);
        }, reject = (err) => { console.log(err) });
    });
  }

  getTypes(){
    return new Promise((resolve, reject) => {
      this.http.get(API+"/enum/typeOuvrage")
        .subscribe((response: any) => {
          resolve(response);
        }, reject = (err) => { console.log(err) });
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Selection function
  // -----------------------------------------------------------------------------------------------------
  toggleSelectedOuvrage(ouvrage): void {
    const indexOuvrageSelected = this.ouvragesSelected.indexOf(ouvrage.id);
    indexOuvrageSelected == -1 ? this.selectOuvrage(ouvrage.id) : this.deselectOuvrage(indexOuvrageSelected);
  }

  selectOuvrage(idOuvrage: string, onEvent = true) {
    this.ouvragesSelected.push(idOuvrage);
    if (onEvent) this.onSelectedOuvragesChanged.next(this.ouvragesSelected);
  }

  deselectOuvrage(indexOuvrageSelected: number, onEvent = true) {
    this.ouvragesSelected.splice(indexOuvrageSelected, 1);
    if (onEvent) this.onSelectedOuvragesChanged.next(this.ouvragesSelected);
  }

  selectAll(): void {
    const ouvragesToSelect = this.ouvragesByFilter.length ? this.ouvragesByFilter : this.ouvrages;
    this.ouvragesSelected = [];

    ouvragesToSelect.forEach(ouvrage => {
        this.selectOuvrage(ouvrage.id, false);
    })
    this.onSelectedOuvragesChanged.next(this.ouvragesSelected);
  }

  deselectAll(): void {
    this.ouvragesSelected = [];
    this.onSelectedOuvragesChanged.next(this.ouvragesSelected);
  }
 
  printFicheTechnique(code: string, type: string){
    this.printReportsService.printReport("print/OuvrageFicheTechnique", {code: code, type: type});
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
        this.getTypes()
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
  exportDataXLS(properties) {
    var data;

    this.toolsService.showProgressBar();

    if (this.ouvragesSelected.length)
      data = this.getOuvragesSelected();
    else if (this.ouvragesByFilter.length)
      data = this.ouvragesByFilter;
    else
      data = this.ouvrages;

    //remove reference
    data = JSON.parse(JSON.stringify(data));

    this.removeProperties(data, properties);
    //this.replacePorperty(data);

    /* generate a worksheet */
    var ws = XLSX.utils.json_to_sheet(data);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ouvrages");

    /* write workbook and force a download */
    XLSX.writeFile(wb, "Ouvrages.xlsx");

    this.toolsService.hideProgressBar();
  }

  getOuvragesSelected() {
    var tab = [];

    for (var i = 0; i < this.ouvragesSelected.length; i++) {
      const ouvrage = this.ouvrages.find(element => {
        return element.id === this.ouvragesSelected[i];
      });
      tab.push(ouvrage);
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
