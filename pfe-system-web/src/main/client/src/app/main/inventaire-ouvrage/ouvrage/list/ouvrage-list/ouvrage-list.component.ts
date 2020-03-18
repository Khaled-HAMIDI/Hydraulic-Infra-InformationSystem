import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from '../Table'
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@ayams/services/authorization.service';
import { OuvrageListService } from './ouvrage-list.service';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
const COLUMN_NAMES: string[] = [
  'checkbox',
  'type',
  'ouvrageCode',
  'unite',
  'commune',
  'debit',
  'enabled',
  'buttons'
];

@Component({
  selector: 'app-ouvrage-list',
  templateUrl: './ouvrage-list.component.html',
  styleUrls: ['./ouvrage-list.component.scss']
})
export class OuvrageListComponent extends Table implements OnInit,OnDestroy {
  private _unsubscribeAll: Subject<any>;
  usersCheckbox: Object;
  selectBarDisplayed: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  btnExport: boolean;
  emptyList: boolean;
  constructor(
    private route: ActivatedRoute,
    public authorizationService: AuthorizationService,
    private userListService: OuvrageListService,
    public _matDialog: MatDialog,
    private toolsService: ToolsService,
    public router: Router) {
    super(COLUMN_NAMES)
    this._unsubscribeAll = new Subject();
    this.usersCheckbox = {};
    this.selectBarDisplayed = false;
  }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response) => {
          this.btnExport = response.data.length;
          this.emptyList = response.data.length == 0;
         // this.initTable(response.data[0]);
          //this.initUsersSelected(response.data[0]);
          //console.log(response.data[0])
      },
      (error) => {

      }
  );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    if (this.confirmDialogRef) this.confirmDialogRef.close();
}

}
