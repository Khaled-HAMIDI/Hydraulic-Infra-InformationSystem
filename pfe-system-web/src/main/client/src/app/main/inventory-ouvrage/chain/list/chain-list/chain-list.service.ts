import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';
import * as XLSX from 'xlsx';
import { ChainList } from '../model/chain.model';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

const OUVRAGE_API = API + '/chains';
@Injectable({
  providedIn: 'root'
})
export class ChainListService implements Resolve<any> {
  chains: ChainList[];
  chainsByFilter: ChainList[];
  chainsSelected: string[];

  onChainsChanged: Subject<any>;
  onSelectedChainsChanged: BehaviorSubject<any>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private toolsService: ToolsService
  ) {
    this.chainsByFilter = [];
    this.chainsSelected = [];
    this.onChainsChanged = new Subject();
    this.onSelectedChainsChanged = new BehaviorSubject([]);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ API function
  // -----------------------------------------------------------------------------------------------------

  getAll(): Promise<ChainList[]> {
    return new Promise((resolve, reject) => {
      this.http.get(OUVRAGE_API)
        .subscribe((response: any) => {
          this.chains = response;
          resolve(response);
        }, reject = (err) => { console.log(err) });
    });
  }

  delete(ids: String[]): Promise<[]> {
    return new Promise((resolve, reject) => {
      this.http.request('delete', OUVRAGE_API, { body: ids })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Selection function
  // -----------------------------------------------------------------------------------------------------
  toggleSelectedChain(chain): void {
    const indexChainSelected = this.chainsSelected.indexOf(chain.id);
    indexChainSelected == -1 ? this.selectChain(chain.id) : this.deselectChain(indexChainSelected);
  }

  selectChain(idChain: string, onEvent = true) {
    this.chainsSelected.push(idChain);
    if (onEvent) this.onSelectedChainsChanged.next(this.chainsSelected);
  }

  deselectChain(indexChainSelected: number, onEvent = true) {
    this.chainsSelected.splice(indexChainSelected, 1);
    if (onEvent) this.onSelectedChainsChanged.next(this.chainsSelected);
  }

  selectAll(): void {
    const chainsToSelect = this.chainsByFilter.length ? this.chainsByFilter : this.chains;
    this.chainsSelected = [];

    chainsToSelect.forEach(chain => {
        this.selectChain(chain.id, false);
    })
    this.onSelectedChainsChanged.next(this.chainsSelected);
  }

  deselectAll(): void {
    this.chainsSelected = [];
    this.onSelectedChainsChanged.next(this.chainsSelected);
  }

  // -----------------------------------------------------------------------------------------------------
    // @ Delete function
    // -----------------------------------------------------------------------------------------------------
    deleteChain(chain): void {
      if (chain.systemEntity) {
          this.toolsService.hideProgressBar();
          this.toolsService.showError('LIST.TOAST.error-delete-system-entity');
          return;
      }

      this.toolsService.showProgressBar();
      this.delete([chain.id]).then(
          (response) => {

              const chainIndex = this.chains.indexOf(chain);
              const indexChainSelected = this.chainsSelected.indexOf(chain.id);

              this.deleteFromChains(chainIndex);
              if (indexChainSelected != -1) this.deselectChain(indexChainSelected);

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

  deleteFromChains(chainIndex, onEvent = true) {
      this.chains.splice(chainIndex, 1);
      if (onEvent) this.onChainsChanged.next(this.chains);
  }


  deleteSelectedChains(): void {
      this.toolsService.showProgressBar();

      this.delete(this.chainsSelected).then(
          (response: any) => {

              this.deleteFromSelectedChains(this.chainsSelected);
              this.onChainsChanged.next(this.chains);
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

  deleteFromSelectedChains(ids_to_delete) {
      for (const chainId of ids_to_delete) {
          const chain = this.chains.find(_chain => {
              return _chain.id === chainId;
          });
          // if (!chain.systemEntity)
          // this.deleteFromChains(this.chains.indexOf(chain), false);
      }
  }
// -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setChainsByFilter(chainsByFilter: any[]) {
      this.chainsByFilter = chainsByFilter;
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

    if (this.chainsSelected.length)
        data = this.getChainsSelected();
    else if (this.chainsByFilter.length)
        data = this.chainsByFilter;
    else
        data = this.chains;

    //remove reference
    data = JSON.parse(JSON.stringify(data));

    this.removeProperties(data, properties);
    //this.replacePorperty(data);
    console.log(data);
    /* generate a worksheet */
    var ws = XLSX.utils.json_to_sheet(data);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Chains");

    /* write workbook and force a download */
    XLSX.writeFile(wb, "Chains.xlsx");

    this.toolsService.hideProgressBar();
}

getChainsSelected() {
    var tab = [];

    for (var i = 0; i < this.chainsSelected.length; i++) {
        const chain = this.chains.find(element => {
            return element.id === this.chainsSelected[i];
        });
        tab.push(chain);
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
