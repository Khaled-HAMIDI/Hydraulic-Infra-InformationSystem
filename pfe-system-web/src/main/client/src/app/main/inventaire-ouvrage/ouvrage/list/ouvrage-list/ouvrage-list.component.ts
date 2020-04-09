import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from '../Table'
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@ayams/services/authorization.service';
import { OuvrageListService } from './ouvrage-list.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
const COLUMN_NAMES: string[] = [
  'checkbox',
  'type',
  'ouvrageCode',
  'commune',
  'debit',
  'enabled',
  'buttons'
];

@Component({
  selector: 'app-ouvrage-list',
  templateUrl: './ouvrage-list.component.html',
  styleUrls: ['./ouvrage-list.component.scss']
})
export class OuvrageListComponent extends Table implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  ouvragesCheckbox: Object;
  selectBarDisplayed: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  btnExport: boolean;
  emptyList: boolean;
  constructor(
    private ouvrageListService: OuvrageListService,
    private route: ActivatedRoute,
    public authorizationService: AuthorizationService,
    public matDialog: MatDialog,
    private toolsService: ToolsService,
    public router: Router) 
    {
    super(COLUMN_NAMES)
    this._unsubscribeAll = new Subject();
    this.ouvragesCheckbox = {};
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
        this.initOuvragesSelected(response.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
    this.ouvrageListService.onSelectedOuvragesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (ouvragesSelected) => {
          this.selectBarDisplayed = ouvragesSelected.length > 0;

          for (const id in this.ouvragesCheckbox) {
              if (!this.ouvragesCheckbox.hasOwnProperty(id)) continue;
              this.ouvragesCheckbox[id] = ouvragesSelected.includes(id);
          }

      }
  );

  this.ouvrageListService.onOuvragesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (ouvrages) => {
          this.dataSource.data = ouvrages;
          this.applyFilter(this.dataSource.filter);
          this.checkPage();
      }
  );
}

initOuvragesSelected(ouvrages) {
  ouvrages.forEach(
      (ouvrage) => {
          this.ouvragesCheckbox[ouvrage.id] = false;
      }
  );
}

// -----------------------------------------------------------------------------------------------------
// @ Event function
// -----------------------------------------------------------------------------------------------------
onSelectedChange(ouvrage): void {
  this.ouvrageListService.toggleSelectedOuvrage(ouvrage);
}

onDelete(ouvrage): void {
  this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);

  this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
  this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      if (result) {
          this.ouvrageListService.deleteOuvrage(ouvrage);

      }
      this.confirmDialogRef = null;
  });

}

// -----------------------------------------------------------------------------------------------------
// @ Public function
// -----------------------------------------------------------------------------------------------------
applyFilter(filterValue: string) {

  this.filter(filterValue);
  this.ouvrageListService.setOuvragesByFilter(this.dataSource.filteredData);
  this.btnExport = this.dataSource['_renderData'].value.length;
}

export() {
  this.ouvrageListService.exportDataXLS(["id"]);
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
