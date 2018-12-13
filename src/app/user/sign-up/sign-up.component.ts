import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() registered_Ev = new EventEmitter<boolean>();
  signUpForm: User;

  constructor(
    private userService: UserService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.reset();
  }

  reset(form?: NgForm) {
    if (!!form) {
      form.reset();
    }
    this.signUpForm = {
      UserName: '',
      Password: '',
      Email: '',
      Location: ''
    };
  }
  onSubmit(form: NgForm) {
    console.log(this.signUpForm);
    this.appService.loading = true;
    this.userService.registerUser(this.signUpForm)
      .subscribe((data: any) => {
        this.appService.loading = false;
        console.log('res:', data);
        if (data.Succeeded === true) {
          this.registered_Ev.emit(true);
          this.reset(form);
        }
      },
        err => {
          this.appService.loading = false;
        }
      );
  }
}
