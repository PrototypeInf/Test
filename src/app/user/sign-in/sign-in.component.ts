import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginrForm: FormGroup;
  get f() { return this.loginrForm.controls; }
  submitted = false;

  get formValid() { return this.loginrForm.valid; }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private appService: AppService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginrForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    this.appService.loading = true;
    const email = this.loginrForm.get('email').value;
    const password = this.loginrForm.get('password').value;
    this.userService.userAuthentication(email, password)
      .subscribe((data: any) => {
        this.userService.signIn(data.access_token);
        this.appService.loading = false;
        this.router.navigate(['/']);
      },
        (err: HttpErrorResponse) => {
          this.userService.loggOff();
          this.appService.loading = false;
          this.toastrService.error('Could not sign in');
        }
      );
  }

}
