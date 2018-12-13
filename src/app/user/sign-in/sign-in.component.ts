import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginrForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
  });
  }

}
