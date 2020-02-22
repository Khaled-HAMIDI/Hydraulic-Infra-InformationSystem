import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Table } from '../../agency/list/Table';
import { ProfilListService } from './profil-list.service';
import { Subject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';

const COLUMN_NAMES: string[] = [
    'checkbox',
    'role',
    'designation',
    'creationDate',
    'lastModifiedDate',
    'authorities',
    'buttons'
];

@Component({
    selector: 'profil-list',
    templateUrl: './profil-list.component.html',
    styleUrls: ['./profil-list.component.scss'],
    animations: fuseAnimations
})
export class ProfilListComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    btnExport: boolean;
    emptyList: boolean;

    profilsCheckbox: Object;
    selectBarDisplayed: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
        private profilListService: ProfilListService,
        public matDialog: MatDialog,
        private toolsService: ToolsService,
        public router: Router) {

        super(COLUMN_NAMES);
        this._unsubscribeAll = new Subject();
        this.profilsCheckbox = {};
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
                this.initProfilsSelected(response.data[0]);
            },
            (error) => {
                console.log(error);
            }
        );

        this.profilListService.onSelectedProfilsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (profilsSelected) => {
                this.selectBarDisplayed = profilsSelected.length > 0;

                for (const id in this.profilsCheckbox) {
                    if (!this.profilsCheckbox.hasOwnProperty(id)) continue;
                    this.profilsCheckbox[id] = profilsSelected.includes(id);
                }

            }
        );

        this.profilListService.onProfilsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (profils) => {
                this.dataSource.data = profils;
                this.applyFilter(this.dataSource.filter);
                this.checkPage();
            }
        );
    }

    initProfilsSelected(profils) {
        profils.forEach(
            (profil) => {
                this.profilsCheckbox[profil.id] = false;
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Event function
    // -----------------------------------------------------------------------------------------------------
    onSelectedChange(profil): void {
        this.profilListService.toggleSelectedProfil(profil);
    }

    onDelete(profil): void {
        this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);

        this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
            if (result) {
                this.profilListService.deleteProfil(profil);

            }
            this.confirmDialogRef = null;
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------
    applyFilter(filterValue: string) {

        this.filter(filterValue);
        this.profilListService.setProfilsByFilter(this.dataSource.filteredData);
        this.btnExport = this.dataSource['_renderData'].value.length;
    }

    export() {
        this.profilListService.exportDataXLS(["id"]);
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



