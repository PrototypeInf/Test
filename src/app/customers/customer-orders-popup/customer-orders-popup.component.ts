import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Order } from 'src/app/order/order.model';
import { CustomersService } from '../customers.service';
import { UserService } from 'src/app/user/user.service';
import { OrderService } from 'src/app/order/order.service';

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
  get isAuterized() {return this.userService.isAuterized; }
  displayedColumns: string[];
  ProductName: string;
  Price: string;

  constructor(
    public dialogRef: MatDialogRef<CustomerOrdersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: CustomerOrdersPopupData,
    private customersService: CustomersService,
    private userService: UserService,
    private orderService: OrderService
    ) {}

  ngOnInit() {
    this.displayedColumns = ['Id', 'ProductName', 'Price'];
    if (this.isAuterized) {
      this.displayedColumns.push('Actions');
    }
  }

  updateOrderList() {
    this.customersService.getOrderList(this.datas.CustomersId)
            .subscribe(
              (httpRes) => {
                this.datas.data = httpRes;
                this.ProductName = undefined;
                this.Price = undefined;
              },
              () => {}
            );
  }
  onDeleteOrder(orderId) {
    this.orderService.delete(orderId).subscribe(
      () => {
        this.updateOrderList();
      },
      () => {}
      );
  }

  onAddOrder() {
    const order: Order = {
      CustomersId: this.datas.CustomersId,
      ProductName: this.ProductName,
      Price: this.Price
    };

    this.customersService.setCustomerOrder(order)
      .subscribe(
        () => {
          this.updateOrderList();
        },
        () => {}
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
