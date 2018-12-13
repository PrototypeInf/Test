import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  selectedTabIndex = 0;

  constructor() { }

  ngOnInit() {
  }

  singUpRes($event) {
      if ($event) {
        this.selectedTabIndex = 0;
      }
  }
}
