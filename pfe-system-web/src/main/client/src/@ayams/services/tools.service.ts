import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  apiErrorCode =["codeExist","invalidInventory","invalidInventoryOuvrage"];

  constructor(
    public matDialog: MatDialog,
    public translate: TranslateService,
    private toastr: ToastrService,
    private fuseTranslationLoader: FuseTranslationLoaderService,
    private fuseProgressBarService: FuseProgressBarService,
  ) {
    this.confirmDialogRef = null;
  }

  // -----------------------------------------------------------------------------------------------------
  // TRANSLATION
  // -----------------------------------------------------------------------------------------------------
  loadTranslations(french, arabic) {
    this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  getTranslation(key) {
    return this.translate.instant(key);
  }

  getTranslationWithInterpolation(key, interpolationParams) {
    return this.translate.instant(key, interpolationParams);
  }

  onLangChange() {
    return this.translate.onLangChange;
  }

  // -----------------------------------------------------------------------------------------------------
  // PROGRESS BAR
  // -----------------------------------------------------------------------------------------------------
  showProgressBar() {
    this.fuseProgressBarService.show();
  }

  hideProgressBar() {
    this.fuseProgressBarService.hide();
  }

  // -----------------------------------------------------------------------------------------------------
  // TOAST
  // -----------------------------------------------------------------------------------------------------
  showSuccess(msg) {
    this.toastr.success(this.getTranslation(msg));
  }

  showError(msg) {
    this.toastr.error(this.getTranslation(msg));
  }

  showApiError(msg:string) {
      if (this.apiErrorCode.includes(msg))  this.toastr.error(this.getTranslation('ADD.TOAST-ADD.' + msg));
      else this.toastr.error(this.getTranslation('ADD.TOAST-ADD.error'));
    }

  // -----------------------------------------------------------------------------------------------------
  // CONFIRM DIALOG
  // -----------------------------------------------------------------------------------------------------
  openDialog(msg: string) {
    this.confirmDialogRef = this.matDialog.open(FuseConfirmDialogComponent);

    this.confirmDialogRef.componentInstance.confirmMessage = this.getTranslation(msg);

    return this.confirmDialogRef.afterClosed();
  }
}
