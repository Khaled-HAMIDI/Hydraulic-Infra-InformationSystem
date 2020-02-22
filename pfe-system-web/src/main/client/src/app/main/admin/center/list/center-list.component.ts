import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { CenterListService } from './center-list.service';
import { Table } from './Table';
import { Subject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';

const COLUMN_NAMES: string[] = [
    'checkbox',
    'code',
    'address',
    'designation',
    'headOfTheStructure',
    'phone',
    'email',
    'buttons'
];

@Component({
    selector: 'center-list',
    templateUrl: './center-list.component.html',
    styleUrls: ['./center-list.component.scss'],
    animations: fuseAnimations
})
export class CenterListComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    btnExport: boolean;
    emptyList: boolean;

    centersCheckbox: Object;
    selectBarDisplayed: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
        private centerListService: CenterListService,
        public matDialog: MatDialog,
        private toolsService: ToolsService,
        public router: Router) {

        super(COLUMN_NAMES);
        this._unsubscribeAll = new Subject();
        this.centersCheckbox = {};
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
                this.initCentersSelected(response.data[0]);
            },
            (error) => {
                console.log(error);
            }
        );

        this.centerListService.onSelectedCentersChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (centersSelected) => {
                this.selectBarDisplayed = centersSelected.length > 0;

                for (const id in this.centersCheckbox) {
                    if (!this.centersCheckbox.hasOwnProperty(id)) continue;
                    this.centersCheckbox[id] = centersSelected.includes(id);
                }
            }
        );

        this.centerListService.onCentersChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (centers) => {
                this.dataSource.data = centers;
                this.applyFilter(this.dataSource.filter);
                this.checkPage();
            }
        );
    }

    initCentersSelected(centers) {
        centers.forEach(
            (center) => {
                this.centersCheckbox[center.id] = false;
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Event function
    // -----------------------------------------------------------------------------------------------------
    onSelectedChange(center): void {
        this.centerListService.toggleSelectedCenter(center);
    }

    onDelete(center): void {
        this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);

        this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
            if (result) {
                this.centerListService.deleteCenter(center);

            }
            this.confirmDialogRef = null;
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------
    applyFilter(filterValue: string) {
        this.filter(filterValue);
        this.centerListService.setCentersByFilter(this.dataSource.filteredData);
        this.btnExport = this.dataSource['_renderData'].value.length;
    }

    export() {
        this.centerListService.exportDataXLS(["id"]);
    }

    heightDyn() {
        return document.getElementById('headerHeight').clientHeight + 'px';
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        if(this.confirmDialogRef) this.confirmDialogRef.close();
    }

}