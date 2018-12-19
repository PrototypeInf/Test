import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Order } from 'src/app/order/order.model';
import { CustomersService } from '../customers.service';
import { UserService } from 'src/app/user/user.service';
import { OrderService } from 'src/app/order/order.service';
import { ConfirmPopupData, ConfirmPopupComponent } from 'src/app/Shared/confirm-popup/confirm-popup.component';
import { HttpErrorResponse } from '@angular/common/http';

export interface CustomerOrdersPopupData {
  CustomersId: number;
  data: Order[];
}

@Component({
  selector: 'app-customer-orders-popup',
  templateUrl: './customer-orders-popup.component.html',
  styleUrls: ['./customer-orders-popup.component.scss']
})
export class CustomerOrdersPopupComponent implements OnInit {
  get isAuterized() { return this.userService.isAuterized; }
  displayedColumns: string[];
  ProductName: string;
  Price: string;

  constructor(
    public dialogRef: MatDialogRef<CustomerOrdersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: CustomerOrdersPopupData,
    private customersService: CustomersService,
    private userService: UserService,
    private orderService: OrderService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.displayedColumns = ['Id', 'ProductName', 'Price'];
    if (this.isAuterized) {
      this.displayedColumns.push('Actions');
    }
  }

  async updateOrderList() {
    const httpRes = await this.customersService.getOrderList(this.datas.CustomersId).toPromise();

    this.datas.data = httpRes;
    this.ProductName = undefined;
    this.Price = undefined;
  }
  async onDeleteOrder(orderId) {
    const dataSend: ConfirmPopupData = {
      message: 'Confirm order removal'
    };
    const dialogRes = await this.dialog.open(ConfirmPopupComponent, {
      data: dataSend
    }).afterClosed().toPromise();

    if (!dialogRes) {
      return;
    }

    await this.orderService.delete(orderId).toPromise();
    this.updateOrderList();
  }

  async onAddOrder() {
    const order: Order = {
      CustomersId: this.datas.CustomersId,
      ProductName: this.ProductName,
      Price: this.Price
    };

    await this.customersService.setCustomerOrder(order).toPromise();
    this.updateOrderList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
