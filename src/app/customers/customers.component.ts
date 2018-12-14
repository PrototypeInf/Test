import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { PageEvent } from '@angular/material';
import { Customers } from './customers.model';

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

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.cardHoveredId = undefined;
    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = 0;
    this.pageEvent.pageSize = this.pageSizeOptions[0];
    this.pageEvent.previousPageIndex = 0;
    setTimeout(() => {
      this.getCustomers();
    }, 0);
  }

  onSearch(txt) {
    console.log(txt);
  }

  getCustomers() {
    const Start =  this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const Length = this.pageEvent.pageSize;
    this.customersService.getAll(Start, Length)
      .subscribe((res) => {
        console.log(res);
        this.pageEvent.length = res.Length;
        this.customers = res.Data;
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
