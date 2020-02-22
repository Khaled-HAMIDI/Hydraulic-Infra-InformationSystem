import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ProfilListService } from '../profil-list.service';
import { takeUntil } from '../../../../../../../node_modules/rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class ProfilsSelectedBarComponent implements OnInit, OnDestroy
{
    selectedProfilsLength: number;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    private _unsubscribeAll: Subject<any>;

    
    constructor(private profilListService: ProfilListService, 
                public _matDialog: MatDialog, 
                private toolsService: ToolsService)
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
        this.profilListService.onSelectedProfilsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (selectedProfils) => {
                this.selectedProfilsLength = selectedProfils.length;
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
        this.profilListService.selectAll();
    }

    onDeselectAll(): void
    {
        this.profilListService.deselectAll();
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
                    this.profilListService.deleteSelectedProfils();
                }
                this.confirmDialogRef = null;
            }
        );
    }

    onExport(): void
    {
        this.profilListService.exportDataXLS(['id']);
    }

}
