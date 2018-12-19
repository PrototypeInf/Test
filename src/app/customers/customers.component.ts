import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { PageEvent, MatDialog } from '@angular/material';
import { Customer, CustomersRespond } from './customers.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerOrdersPopupComponent } from './customer-orders-popup/customer-orders-popup.component';
import { CustomerEditPopupComponent, CustomerEditPopupData } from './customer-edit-popup/customer-edit-popup.component';
import { UserService } from '../user/user.service';
import { ConfirmPopupComponent, ConfirmPopupData } from '../Shared/confirm-popup/confirm-popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  get isAuterized() { return this.userService.isAuterized; }

  pageSizeOptions = [10, 12, 32, 100];
  pageEvent: PageEvent;
  customers: Customer[];
  cardHoveredId: number;
  pageType: string;
  displayedColumns: string[] = ['Id', 'Name', 'Location', 'Actions'];
  searchTxt: string;

  constructor(
    private customersService: CustomersService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.pageType = 'view_module';
    this.cardHoveredId = undefined;

    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = 0;
    this.pageEvent.pageSize = this.pageSizeOptions[1];
    this.pageEvent.previousPageIndex = 0;
    this.setRange();

    setTimeout(() => {
      this.getCustomers();
    }, 0);
  }

  async deleteCustomer(customerId) {
    const dataSend: ConfirmPopupData = {
      message: 'Confirm customer removal'
    };
    const dialogRes = await this.dialog.open(ConfirmPopupComponent, {
      data: dataSend
    }).afterClosed().toPromise();

    if (!dialogRes) {
      return;
    }

    await this.customersService.delete(customerId).toPromise();
    this.getCustomers();
  }

  async editCustomer(customerId) {
    const customer = await this.customersService.get(customerId).toPromise();
    const sendData: CustomerEditPopupData = {
      title: 'Edit customer',
      message: `Edit customer with Id - ${customer.Id}`,
      data: customer
    };

    const dialogRes = await this.dialog.open(CustomerEditPopupComponent, {
      data: sendData
    }).afterClosed().toPromise();

    if (!dialogRes) {
      return;
    }

    await this.customersService.edit(dialogRes).toPromise();

    this.getCustomers();
  }

  async addCustomer() {
    const sendData: CustomerEditPopupData = {
      title: 'New customer',
      message: 'Add a new customer',
      data: {
        Location: '',
        Name: ''
      }
    };

    const dialodRes = await this.dialog.open(CustomerEditPopupComponent, {
      panelClass: 'popup',
      data: sendData
    }).afterClosed().toPromise();

    if (!dialodRes) {
      return;
    }

    await this.customersService.add(dialodRes).toPromise();
    this.getCustomers();
  }

  setPageType(pageType) {
    this.pageType = pageType;
  }

  async ordersListShow(customerId) {
    const res = await this.customersService.getOrderList(customerId).toPromise();
    this.dialog.open(CustomerOrdersPopupComponent, {
      minWidth: '300px',
      width: '40%',
      data: {
        CustomersId: customerId,
        data: res
      }
    });
  }

  initPage(data: CustomersRespond) {
    this.pageEvent.length = data.Length;
    this.customers = data.Data;
  }

  async onSearch(txt) {
    this.searchTxt = txt;
    const res = await this.customersService.search(txt).toPromise();
    this.initPage(res);
  }

  setRange() {
    const Start = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const Length = this.pageEvent.pageSize;
    this.customersService.setAmountOfData(Start, Length);
  }

  async getCustomers() {
    const res = await this.customersService.getAll().toPromise();
    this.initPage(res);
  }

  onPageEv(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.setRange();
    if (this.searchTxt) {
      this.onSearch(this.searchTxt);
      return;
    }
    this.getCustomers();
  }

  onCardEnter(id: number) {
    this.cardHoveredId = id;
  }
  onCardLeave() {
    this.cardHoveredId = undefined;
  }
}
