import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Table } from './Table';
import { UserListService } from './user-list.service';
import { Subject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';
import { AuthorizationService } from '@ayams/services/authorization.service';


const COLUMN_NAMES: string[] = [
    'checkbox',
    'username',
    'employeeCode',
    'lastName',
    'firstName',
    'structure',
    'roles',
    'enabled',
    'buttons'
];

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: fuseAnimations
})
export class UserListComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    usersCheckbox: Object;
    selectBarDisplayed: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    btnExport: boolean;
    emptyList: boolean;

    constructor(private route: ActivatedRoute,
        public authorizationService:AuthorizationService,
        private userListService: UserListService,
        public _matDialog: MatDialog,
        private toolsService: ToolsService,
        public router: Router) {

        super(COLUMN_NAMES);
        this._unsubscribeAll = new Subject();
        this.usersCheckbox = {};
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
                this.initUsersSelected(response.data[0]);
            },
            (error) => {

            }
        );

        this.userListService.onSelectedUsersChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (usersSelected) => {
                this.selectBarDisplayed = usersSelected.length > 0;

                for (const id in this.usersCheckbox) {
                    if (!this.usersCheckbox.hasOwnProperty(id)) continue;
                    this.usersCheckbox[id] = usersSelected.includes(id);
                }
            }
        );

        this.userListService.onUsersChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (users) => {
                this.dataSource.data = users;
                this.applyFilter(this.dataSource.filter);
                this.checkPage();
            }
        );
    }

    initUsersSelected(users) {
        users.forEach(
            (user) => {
                this.usersCheckbox[user.id] = false;
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Event function
    // -----------------------------------------------------------------------------------------------------
    onSelectedChange(user): void {
        this.userListService.toggleSelectedUser(user);
    }

    onDelete(user): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent);

        this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.delete');
        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
            if (result) {
                this.userListService.deleteUser(user);

            }
            this.confirmDialogRef = null;
        });

    }

    onResetPswd(user): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent);

        this.confirmDialogRef.componentInstance.confirmMessage = this.toolsService.getTranslation('LIST.CONFIRM-DIALOG.reset');
        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
            if (result) {
                this.userListService.resetPassword(user);

            }
            this.confirmDialogRef = null;
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------
    applyFilter(filterValue: string) {
        this.filter(filterValue);
        this.userListService.setUsersByFilter(this.dataSource.filteredData);
        this.btnExport = this.dataSource['_renderData'].value.length;
    }

    export() {
        this.userListService.exportDataXLS(["id", "active"]);
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
