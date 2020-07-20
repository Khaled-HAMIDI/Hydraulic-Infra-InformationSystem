import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from '../Table'
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@ayams/services/authorization.service';
import { OuvrageDeclassedListService } from './ouvrage-list.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
const COLUMN_NAMES: string[] = [
  'checkbox',
  'name',
  'code',
  'declassedDate',
  'commissioningDate',
  'operatingDate',
  'buttons'
];

@Component({
  selector: 'app-ouvrage-list',
  templateUrl: './ouvrage-list.component.html',
  styleUrls: ['./ouvrage-list.component.scss'],
  animations: fuseAnimations
})
export class OuvrageDeclassedListComponent extends Table implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  ouvragesCheckbox: Object;
  selectBarDisplayed: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  btnExport: boolean;
  emptyList: boolean;
  currentCategory;
  filtredOuvrages;
  searchTerm: string = '';
  types = [];
  constructor(
    private ouvrageListService: OuvrageDeclassedListService,
    private route: ActivatedRoute,
    public authorizationService: AuthorizationService,
    public matDialog: MatDialog,
    private toolsService: ToolsService,
    public router: Router) {
    super(COLUMN_NAMES)
    this._unsubscribeAll = new Subject();
    this.ouvragesCheckbox = {};
    this.selectBarDisplayed = false;
    this.toolsService.loadTranslations(french, arabic);
    this.currentCategory = 'all'
    this.filtredOuvrages = []
  }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response) => {
        response.data[0].forEach(ouv=>{
          ouv.declassedDate = new Date(ouv.declassedDate);
        })
        this.types = response.data[1];
        this.btnExport = response.data[0].length;
        this.emptyList = response.data[0].length == 0;
        this.filtredOuvrages = response.data[0]
        this.initTable(this.filtredOuvrages);
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


  onSelectAll(): void {
    this.ouvrageListService.selectAll();
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

  onPrintFicheTechnique(code: string, type: string){
    this.ouvrageListService.printFicheTechnique(code, type);
  }
  
  // -----------------------------------------------------------------------------------------------------
  // @ Public function
  // -----------------------------------------------------------------------------------------------------
  filterOuvragesByType(): void {
    console.log(this.currentCategory);
    // Filter
    if (this.currentCategory === 'all') {
      this.filtredOuvrages = this.ouvrageListService.ouvrages;
      this.initTable(this.filtredOuvrages);
      this.ouvrageListService.setOuvragesByFilter(this.filtredOuvrages)
      //this.filteredCourses = this.courses;
    }
    else {
      this.filtredOuvrages = this.ouvrageListService.ouvrages.filter((ouvrage) => {
        return ouvrage.type === this.currentCategory;
      });
      this.initTable(this.filtredOuvrages);
      this.ouvrageListService.setOuvragesByFilter(this.filtredOuvrages)
      //this.filteredCourses = [...this.coursesFilteredByCategory];

    }

    // Re-filter by search term
    this.applyFilter(this.searchTerm)
  }

  applyFilter(filterValue: string) {

    this.filter(filterValue);
    this.ouvrageListService.setOuvragesByFilter(this.dataSource.filteredData);
    this.filtredOuvrages = this.dataSource.filteredData;
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
