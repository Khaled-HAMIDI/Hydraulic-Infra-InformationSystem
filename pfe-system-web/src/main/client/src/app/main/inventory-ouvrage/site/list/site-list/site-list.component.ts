import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from '../Table'
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@ayams/services/authorization.service';
import { SiteListService } from './site-list.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
const COLUMN_NAMES: string[] = [
  'checkbox',
  'name',
  //'space',
  'buttons'
];

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
  animations: fuseAnimations
})
export class SiteListComponent extends Table implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  sitesCheckbox: Object;
  selectBarDisplayed: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  btnExport: boolean;
  emptyList: boolean;
  constructor(
    private siteListService: SiteListService,
    private route: ActivatedRoute,
    public authorizationService: AuthorizationService,
    public matDialog: MatDialog,
    private toolsService: ToolsService,
    public router: Router) 
    {
    super(COLUMN_NAMES)
    this._unsubscribeAll = new Subject();
    this.sitesCheckbox = {};
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
        this.initSitesSelected(response.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
    this.siteListService.onSelectedSitesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (sitesSelected) => {
          this.selectBarDisplayed = sitesSelected.length > 0;

          for (const id in this.sitesCheckbox) {
              if (!this.sitesCheckbox.hasOwnProperty(id)) continue;
              this.sitesCheckbox[id] = sitesSelected.includes(id);
          }

      }
  );

  this.siteListService.onSitesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (sites) => {
          this.dataSource.data = sites;
          this.applyFilter(this.dataSource.filter);
          this.checkPage();
      }
  );
}

initSitesSelected(sites) {
  sites.forEach(
      (site) => {
          this.sitesCheckbox[site.id] = false;
      }
  );
}

// -----------------------------------------------------------------------------------------------------
// @ Event function
// -----------------------------------------------------------------------------------------------------
onSelectedChange(site): void {
  this.siteListService.toggleSelectedSite(site);
}

onDelete(site): void {
  this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);

  this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
  this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      if (result) {
          this.siteListService.deleteSite(site);

      }
      this.confirmDialogRef = null;
  });

}

// -----------------------------------------------------------------------------------------------------
// @ Public function
// -----------------------------------------------------------------------------------------------------
applyFilter(filterValue: string) {

  this.filter(filterValue);
  this.siteListService.setSitesByFilter(this.dataSource.filteredData);
  this.btnExport = this.dataSource['_renderData'].value.length;
}

export() {
  this.siteListService.exportDataXLS(["id"]);
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
