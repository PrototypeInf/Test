import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  pg = {
    length: 110,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  };
  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    setTimeout(() => {
      this.customersService.getAll();
    }, 0);
  }

  pgEv(pageEvent: PageEvent) {
    console.log(pageEvent);
  }
}
