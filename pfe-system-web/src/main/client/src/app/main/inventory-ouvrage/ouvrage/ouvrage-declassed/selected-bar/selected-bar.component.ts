import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { OuvrageDeclassedListService } from '../ouvrage-list/ouvrage-list.service';
import { takeUntil } from '../../../../../../../node_modules/rxjs/operators';
import { ToolsService } from '@ayams/services/tools.service';
@Component({
    selector   : 'ouvrages-declasse-selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class OuvragesDeclassedSelectedBarComponent implements OnInit, OnDestroy
{
    selectedOuvragesLength: number;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    private _unsubscribeAll: Subject<any>;

    
    constructor(private ouvrageListService: OuvrageDeclassedListService, public _matDialog: MatDialog, private toolsService: ToolsService)
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
        this.ouvrageListService.onSelectedOuvragesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (selectedOuvrages) => {
                this.selectedOuvragesLength = selectedOuvrages.length;
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
        this.ouvrageListService.selectAll();
    }

    onDeselectAll(): void
    {
        this.ouvrageListService.deselectAll();
    }

    export(){
        this.ouvrageListService.exportDataXLS(["id","active"]);
    }
}
