import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../customers.model';

export interface CustomerEditPopupData {
  title: string;
  message: string;
  data: Customer;
}

@Component({
  selector: 'app-customer-edit-popup',
  templateUrl: './customer-edit-popup.component.html',
  styleUrls: ['./customer-edit-popup.component.scss']
})
export class CustomerEditPopupComponent implements OnInit {
  data: CustomerEditPopupData;

  constructor(
    public dialogRef: MatDialogRef<CustomerEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public incData: CustomerEditPopupData
    ) {}

  ngOnInit() {
    this.data = this.incData;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(): void {
    this.dialogRef.close(this.data.data);
  }

}
