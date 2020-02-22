import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Table } from './Table';
import { AgencyListService } from './agency-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';

const COLUMN_NAMES: string[] = [
    'checkbox',
    'code',
    'address',
    'designation',
    'center',
    'agencyType',
    'headOfTheStructure',
    'phone',
    'email',
    'buttons'
];

@Component({
    selector: 'agency-list',
    templateUrl: './agency-list.component.html',
    styleUrls: ['./agency-list.component.scss'],
    animations: fuseAnimations
})
export class AgencyListComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;

    btnExport: boolean;
    emptyList: boolean;

    agenciesCheckbox: Object;
    selectBarDisplayed: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
        private agencyListService: AgencyListService,
        public matDialog: MatDialog,
        private toolsService: ToolsService,
        public router: Router) {

        super(COLUMN_NAMES);
        this._unsubscribeAll = new Subject();
        this.agenciesCheckbox = {};
        this.selectBarDisplayed = false;
        this.toolsService.loadTranslations(french, arabic);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Init function
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.btnExport = response.data[0].length;
                this.emptyList = response.data[0].length == 0;
                this.initTable(response.data[0]);
                this.initAgenciesSelected(response.data[0]);
            },
            (error) => {
                console.log(error);
            }
        );

        this.agencyListService.onSelectedAgenciesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (agenciesSelected) => {
                this.selectBarDisplayed = agenciesSelected.length > 0;

                for (const id in this.agenciesCheckbox) {
                    if (!this.agenciesCheckbox.hasOwnProperty(id)) continue;
                    this.agenciesCheckbox[id] = agenciesSelected.includes(id);
                }
            }
        );

        this.agencyListService.onAgenciesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (agencies) => {
                this.dataSource.data = agencies;
                this.applyFilter(this.dataSource.filter);
                this.checkPage();

            }
        );
    }

    initAgenciesSelected(agencies) {
        agencies.forEach(
            (agency) => {
                this.agenciesCheckbox[agency.id] = false;
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Event function
    // -----------------------------------------------------------------------------------------------------
    onSelectedChange(agency): void {
        this.agencyListService.toggleSelectedAgency(agency);
    }

    onDelete(agency): void {
        this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);

        this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
            if (result) {
                this.agencyListService.deleteAgency(agency);

            }
            this.confirmDialogRef = null;
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------
    applyFilter(filterValue: string) {
        this.filter(filterValue);
        this.agencyListService.setAgenciesByFilter(this.dataSource.filteredData);
        this.btnExport = this.dataSource['_renderData'].value.length;
    }

    export() {
        this.agencyListService.exportDataXLS(['id']);
    }

    heightDyn() {
        return document.getElementById('headerHeight').clientHeight + 'px';
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        if(this.confirmDialogRef) this.confirmDialogRef.close();
    }

}



