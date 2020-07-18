import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';
import * as XLSX from 'xlsx';
import { SiteList } from '../model/site.model';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

const SITE_API = API + '/site';
@Injectable({
  providedIn: 'root'
})
export class SiteListService implements Resolve<any> {
  sites: SiteList[];
  sitesByFilter: SiteList[];
  sitesSelected: string[];

  onSitesChanged: Subject<any>;
  onSelectedSitesChanged: BehaviorSubject<any>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private toolsService: ToolsService
  ) {
    this.sitesByFilter = [];
    this.sitesSelected = [];
    this.onSitesChanged = new Subject();
    this.onSelectedSitesChanged = new BehaviorSubject([]);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ API function
  // -----------------------------------------------------------------------------------------------------

  getAll(): Promise<SiteList[]> {
    return new Promise((resolve, reject) => {
      this.http.get(SITE_API)
        .subscribe((response: any) => {
          this.sites = response;
          resolve(response);
        }, reject = (err) => { console.log(err) });
    });
  }

  delete(ids: String[]): Promise<[]> {
    return new Promise((resolve, reject) => {
      this.http.request('delete', SITE_API, { body: ids })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Selection function
  // -----------------------------------------------------------------------------------------------------
  toggleSelectedSite(site): void {
    const indexSiteSelected = this.sitesSelected.indexOf(site.id);
    indexSiteSelected == -1 ? this.selectSite(site.id) : this.deselectSite(indexSiteSelected);
  }

  selectSite(idSite: string, onEvent = true) {
    this.sitesSelected.push(idSite);
    if (onEvent) this.onSelectedSitesChanged.next(this.sitesSelected);
  }

  deselectSite(indexSiteSelected: number, onEvent = true) {
    this.sitesSelected.splice(indexSiteSelected, 1);
    if (onEvent) this.onSelectedSitesChanged.next(this.sitesSelected);
  }

  selectAll(): void {
    const sitesToSelect = this.sitesByFilter.length ? this.sitesByFilter : this.sites;
    this.sitesSelected = [];

    sitesToSelect.forEach(site => {
        this.selectSite(site.id, false);
    })
    this.onSelectedSitesChanged.next(this.sitesSelected);
  }

  deselectAll(): void {
    this.sitesSelected = [];
    this.onSelectedSitesChanged.next(this.sitesSelected);
  }

  // -----------------------------------------------------------------------------------------------------
    // @ Delete function
    // -----------------------------------------------------------------------------------------------------
    deleteSite(site): void {
      if (site.systemEntity) {
          this.toolsService.hideProgressBar();
          this.toolsService.showError('LIST.TOAST.error-delete-system-entity');
          return;
      }

      this.toolsService.showProgressBar();
      this.delete([site.id]).then(
          (response) => {

              const siteIndex = this.sites.indexOf(site);
              const indexSiteSelected = this.sitesSelected.indexOf(site.id);

              this.deleteFromSites(siteIndex);
              if (indexSiteSelected != -1) this.deselectSite(indexSiteSelected);

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

  deleteFromSites(siteIndex, onEvent = true) {
      this.sites.splice(siteIndex, 1);
      if (onEvent) this.onSitesChanged.next(this.sites);
  }


  deleteSelectedSites(): void {
      this.toolsService.showProgressBar();

      this.delete(this.sitesSelected).then(
          (response: any) => {

              this.deleteFromSelectedSites(this.sitesSelected);
              this.onSitesChanged.next(this.sites);
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

  deleteFromSelectedSites(ids_to_delete) {
      for (const siteId of ids_to_delete) {
          const site = this.sites.find(_site => {
              return _site.id === siteId;
          });
          // if (!site.systemEntity)
          // this.deleteFromSites(this.sites.indexOf(site), false);
      }
  }
// -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setSitesByFilter(sitesByFilter: any[]) {
      this.sitesByFilter = sitesByFilter;
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
          //this.router.navigate(['**']);
          resolve();
        }
      );
    });



  }
  exportDataXLS(properties) {
    var data;

    this.toolsService.showProgressBar();

    if (this.sitesSelected.length)
        data = this.getSitesSelected();
    else if (this.sitesByFilter.length)
        data = this.sitesByFilter;
    else
        data = this.sites;

    //remove reference
    data = JSON.parse(JSON.stringify(data));

    this.removeProperties(data, properties);
    //this.replacePorperty(data);
    console.log(data);
    /* generate a worksheet */
    var ws = XLSX.utils.json_to_sheet(data);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sites");

    /* write workbook and force a download */
    XLSX.writeFile(wb, "Sites.xlsx");

    this.toolsService.hideProgressBar();
}

getSitesSelected() {
    var tab = [];

    for (var i = 0; i < this.sitesSelected.length; i++) {
        const site = this.sites.find(element => {
            return element.id === this.sitesSelected[i];
        });
        tab.push(site);
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
