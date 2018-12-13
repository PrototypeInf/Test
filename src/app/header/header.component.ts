import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  get isAuterized() {return this.userService.isAuterized; }
  constructor(
      private userService: UserService,
      private router: Router
    ) { }

  ngOnInit() {
  }

  logOff() {
    this.userService.loggOff();
    this.router.navigate(['/']);
  }
}
