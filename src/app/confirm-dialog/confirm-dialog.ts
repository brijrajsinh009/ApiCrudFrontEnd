import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogActions, MatDialogContent, MatButton, MatDialogTitle],
  template: `
  <div class="m-2">
  <h3 mat-dialog-title>Confirm</h3>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions class=" gap-2 ">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button matButton="filled" color="warn" (click)="onConfirm()">{{ data.btn }}</button>
    </mat-dialog-actions>
  </div>
  `,
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
