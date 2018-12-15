import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { PageEvent, MatDialog } from '@angular/material';
import { Customers, CustomersRespond } from './customers.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerOrdersPopupComponent } from './customer-orders-popup/customer-orders-popup.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  pageSizeOptions = [10, 12, 32, 100];
  pageEvent: PageEvent;
  customers: Customers[];
  cardHoveredId: number;

  constructor(
    private customersService: CustomersService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cardHoveredId = undefined;
    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = 0;
    this.pageEvent.pageSize = this.pageSizeOptions[1];
    this.pageEvent.previousPageIndex = 0;
    setTimeout(() => {
      this.getCustomers();
    }, 0);
  }

  ordersListShow(customerId): void {
    this.customersService.getOrderList(customerId)
      .subscribe((res) => {
        this.dialog.open(CustomerOrdersPopupComponent, {
          minWidth: '300px',
          width: '40%',
          data: res
        });
      },
        err => {
          this.toastrService.error('Server error');
        }
      );
  }

  initPage(data: CustomersRespond) {
    this.pageEvent.length = data.Length;
    this.customers = data.Data;
  }

  onSearch(txt) {
    this.customersService.search(txt)
      .subscribe((res) => {
        this.initPage(res);
      });
  }

  getCustomers() {
    const Start = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const Length = this.pageEvent.pageSize;
    this.customersService.setAmountOfData(Start, Length);
    this.customersService.getAll()
      .subscribe((res) => {
        console.log(res);
        this.initPage(res);
      },
        err => {
          this.toastrService.error('Server error');
        });
  }

  onPageEv(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getCustomers();
    console.log(this.pageEvent);
  }

  onCardEnter(id: number) {
    this.cardHoveredId = id;
  }
  onCardLeave() {
    this.cardHoveredId = undefined;
  }
}
