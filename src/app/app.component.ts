import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public appService: AppService,
    private userService: UserService
    ) {}

  get loading() { return this.appService.loading; }

  ngOnInit() {
    this.userService.tryLogIn();
  }

  ngOnDestroy() {
    // this.userService.loggOff();
  }
}
