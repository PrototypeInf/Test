import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customer-orders-popup',
  templateUrl: './customer-orders-popup.component.html',
  styleUrls: ['./customer-orders-popup.component.scss']
})
export class CustomerOrdersPopupComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'ProductName'];
  constructor(
    public dialogRef: MatDialogRef<CustomerOrdersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: Object
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
   }

}
