import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from '../Table'
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@ayams/services/authorization.service';
import { ChainListService } from './chain-list.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
const COLUMN_NAMES: string[] = [
  'checkbox',
  'chainCode',
  'name',
  'commune',
  'enabled',
  'buttons'
];

@Component({
  selector: 'app-chain-list',
  templateUrl: './chain-list.component.html',
  styleUrls: ['./chain-list.component.scss'],
  animations: fuseAnimations
})
export class ChainListComponent extends Table implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  chainsCheckbox: Object;
  selectBarDisplayed: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  btnExport: boolean;
  emptyList: boolean;
  constructor(
    private chainListService: ChainListService,
    private route: ActivatedRoute,
    public authorizationService: AuthorizationService,
    public matDialog: MatDialog,
    private toolsService: ToolsService,
    public router: Router) 
    {
    super(COLUMN_NAMES)
    this._unsubscribeAll = new Subject();
    this.chainsCheckbox = {};
    this.selectBarDisplayed = false;
    this.toolsService.loadTranslations(french, arabic);
  }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response) => {
        console.log(response.data[0]);
        this.btnExport = response.data[0].length;
        this.emptyList = response.data[0].length == 0;
        this.initTable(response.data[0]);
        this.initChainsSelected(response.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
    this.chainListService.onSelectedChainsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (chainsSelected) => {
          this.selectBarDisplayed = chainsSelected.length > 0;

          for (const id in this.chainsCheckbox) {
              if (!this.chainsCheckbox.hasOwnProperty(id)) continue;
              this.chainsCheckbox[id] = chainsSelected.includes(id);
          }

      }
  );

  this.chainListService.onChainsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (chains) => {
          this.dataSource.data = chains;
          this.applyFilter(this.dataSource.filter);
          this.checkPage();
      }
  );
}

initChainsSelected(chains) {
  chains.forEach(
      (chain) => {
          this.chainsCheckbox[chain.id] = false;
      }
  );
}

// -----------------------------------------------------------------------------------------------------
// @ Event function
// -----------------------------------------------------------------------------------------------------
onSelectedChange(chain): void {
  this.chainListService.toggleSelectedChain(chain);
}

onDelete(chain): void {
  this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);

  this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
  this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      if (result) {
          this.chainListService.deleteChain(chain);

      }
      this.confirmDialogRef = null;
  });

}

// -----------------------------------------------------------------------------------------------------
// @ Public function
// -----------------------------------------------------------------------------------------------------
applyFilter(filterValue: string) {

  this.filter(filterValue);
  this.chainListService.setChainsByFilter(this.dataSource.filteredData);
  this.btnExport = this.dataSource['_renderData'].value.length;
}

export() {
  this.chainListService.exportDataXLS(["id"]);
}

heightDyn() {
  return document.getElementById('headerHeight').clientHeight + 'px';
}

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    if (this.confirmDialogRef) this.confirmDialogRef.close();
  }

}
