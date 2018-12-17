import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { PageEvent, MatDialog } from '@angular/material';
import { Customer, CustomersRespond } from './customers.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerOrdersPopupComponent } from './customer-orders-popup/customer-orders-popup.component';
import { CustomerEditPopupComponent, CustomerEditPopupData } from './customer-edit-popup/customer-edit-popup.component';
import { UserService } from '../user/user.service';
import { ConfirmPopupComponent, ConfirmPopupData } from '../Shared/confirm-popup/confirm-popup.component';

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

  deleteCustomer(customerId) {
    const dataSend: ConfirmPopupData = {
      message: 'Confirm customer removal'
    };
    this.dialog.open(ConfirmPopupComponent, {
      data: dataSend
    })
      .afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
        this.customersService.delete(customerId)
          .subscribe(
            () => {
              this.getCustomers();
            },
            () => { }
          );
      });
  }

  async editCustomer(customerId) {
    try {
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
    } catch (err) {}
  }

  addCustomer() {
    const sendData: CustomerEditPopupData = {
      title: 'New customer',
      message: 'Add a new customer',
      data: {
        Location: '',
        Name: ''
      }
    };

    this.dialog.open(CustomerEditPopupComponent, {
      panelClass: 'popup',
      data: sendData
    })
      .afterClosed().subscribe(res => {
        if (res) {
          this.customersService.add(res)
            .subscribe(
              (httpRes) => {
                this.getCustomers();
              },
              () => {
              }
            );
        }
      });
  }

  setPageType(pageType) {
    this.pageType = pageType;
  }

  ordersListShow(customerId): void {
    this.customersService.getOrderList(customerId)
      .subscribe((res) => {
        this.dialog.open(CustomerOrdersPopupComponent, {
          minWidth: '300px',
          width: '40%',
          data: {
            CustomersId: customerId,
            data: res
          }
        });
      },
        err => {
        }
      );
  }

  initPage(data: CustomersRespond) {
    this.pageEvent.length = data.Length;
    this.customers = data.Data;
  }

  onSearch(txt) {
    this.searchTxt = txt;
    this.customersService.search(txt)
      .subscribe((res) => {
        this.initPage(res);
      });
  }

  setRange() {
    const Start = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const Length = this.pageEvent.pageSize;
    this.customersService.setAmountOfData(Start, Length);
  }

  getCustomers() {
    this.customersService.getAll()
      .subscribe(
        (res) => {
          this.initPage(res);
        },
        err => {
        }
      );
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
