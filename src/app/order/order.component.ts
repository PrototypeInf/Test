import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { OrderService, OrdersRespond, CustomerOrders } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  pageSizeOptions = [10, 12, 32, 100];
  pageEvent: PageEvent;
  cardHoveredId: number;
  pageType: string;
  displayedColumns: string[] = ['CustomersId', 'CustomersName', 'CustomerOrders', 'TotalPrice'];
  customerOrdersdisplayedColumns: string[] = ['Id', 'ProductName', 'Price'];
  customerOrders: CustomerOrders;

  constructor(
    private oderService: OrderService
  ) { }

  ngOnInit() {
    this.cardHoveredId = undefined;

    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = 0;
    this.pageEvent.pageSize = this.pageSizeOptions[1];
    this.pageEvent.previousPageIndex = 0;

    setTimeout(() => {
      this.getOrders();
    }, 0);
  }

  async getOrders() {
    try {
    const Start = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const Length = this.pageEvent.pageSize;
    this.oderService.setAmountOfData(Start, Length);
    const httpRes = await this.oderService.getAll().toPromise();
    this.initPage(httpRes);
    } catch (err) {}
  }

  initPage(data: OrdersRespond) {
    this.pageEvent.length = data.Length;
    this.customerOrders = data.CustomerOrders;
  }

  onSearch(txt) {
    /*this.customersService.search(txt)
      .subscribe((res) => {
        this.initPage(res);
      });*/
  }

  onPageEv(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getOrders();
  }

  onCardEnter(id: number) {
    this.cardHoveredId = id;
  }
  onCardLeave() {
    this.cardHoveredId = undefined;
  }
}
