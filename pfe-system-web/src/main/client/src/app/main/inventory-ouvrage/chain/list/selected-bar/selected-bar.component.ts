import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ChainListService } from '../chain-list/chain-list.service';
import { takeUntil } from '../../../../../../../node_modules/rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';
@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class ChainsSelectedBarComponent implements OnInit, OnDestroy
{
    selectedChainsLength: number;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    private _unsubscribeAll: Subject<any>;

    
    constructor(private chainListService: ChainListService, public _matDialog: MatDialog, private toolsService: ToolsService)
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
        this.chainListService.onSelectedChainsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (selectedChains) => {
                this.selectedChainsLength = selectedChains.length;
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
        this.chainListService.selectAll();
    }

    onDeselectAll(): void
    {
        this.chainListService.deselectAll();
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
                    this.chainListService.deleteSelectedChains();
                }
                this.confirmDialogRef = null;
            }
        );
    }

    export(){
        this.chainListService.exportDataXLS(["id","active"]);
    }
}
