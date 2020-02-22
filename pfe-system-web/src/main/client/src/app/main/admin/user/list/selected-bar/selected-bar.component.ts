import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { UserListService } from '../user-list.service';
import { takeUntil } from '../../../../../../../node_modules/rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';
@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class UsersSelectedBarComponent implements OnInit, OnDestroy
{
    selectedUsersLength: number;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    private _unsubscribeAll: Subject<any>;

    
    constructor(private userListService: UserListService, public _matDialog: MatDialog, private toolsService: ToolsService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.toolsService.loadTranslations(french, arabic);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    { 
        this.userListService.onSelectedUsersChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (selectedUsers) => {
                this.selectedUsersLength = selectedUsers.length;
            }
        );
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        if(this.confirmDialogRef) this.confirmDialogRef.close();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Event function
    // -----------------------------------------------------------------------------------------------------
    onSelectAll(): void
    {
        this.userListService.selectAll();
    }

    onDeselectAll(): void
    {
        this.userListService.deselectAll();
    }

    onDeleteSelected(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage= this.toolsService.getTranslation('SELECT-BAR.CONFIRM-DIALOG.delete');
        
        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
                if ( result )
                {
                    this.userListService.deleteSelectedUsers();
                }
                this.confirmDialogRef = null;
            }
        );
    }

    export(){
        this.userListService.exportDataXLS(["id","active"]);
    }
}
