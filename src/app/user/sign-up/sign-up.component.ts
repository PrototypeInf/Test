import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.reset();
  }

  reset(form?: NgForm) {
    if (!!form) {
      form.reset();
    }
    this.signUpForm = {
      Password: '',
      Email: '',
      Location: '',
      Name: ''
    };
  }
  async onSubmit(form: NgForm) {
    const data = await this.userService.registerUser(this.signUpForm).toPromise();
    if (data.Succeeded === true) {
      this.registered_Ev.emit(true);
      this.reset(form);
    }
  }
}
