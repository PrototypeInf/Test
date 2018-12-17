import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { OrderService, CustomerOrders, OrdersRespondGroup } from './order.service';

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
  searchTxt: string;

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
    this.setRange();

    setTimeout(() => {
      this.getOrders();
    }, 0);
  }

  setRange() {
    const Start = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const Length = this.pageEvent.pageSize;
    this.oderService.setAmountOfData(Start, Length);
  }

  async getOrders() {
    try {
      const httpRes = await this.oderService.getAll().toPromise();
      this.initPage(httpRes);
    } catch (err) { }
  }

  initPage(data: OrdersRespondGroup) {
    this.pageEvent.length = data.Length;
    this.customerOrders = data.CustomerOrders;
  }

  async onSearch(txt) {
    try {
      this.searchTxt = txt;
      const httpRes = await this.oderService.search(txt).toPromise();
      this.initPage(httpRes);
    } catch (err) { }
  }

  onPageEv(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.setRange();
    if (this.searchTxt) {
      this.onSearch(this.searchTxt);
      return;
    }
    this.getOrders();
  }

  onCardEnter(id: number) {
    this.cardHoveredId = id;
  }
  onCardLeave() {
    this.cardHoveredId = undefined;
  }
}
