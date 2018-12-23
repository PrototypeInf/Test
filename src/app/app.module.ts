import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserService } from './user/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppService } from './app.service';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CustomersComponent } from './customers/customers.component';
import { GlobalSettingsService } from './Shared/global-settings.service';
import { CustomersService } from './customers/customers.service';
import { CustomerOrdersPopupComponent } from './customers/customer-orders-popup/customer-orders-popup.component';
import { CustomerEditPopupComponent } from './customers/customer-edit-popup/customer-edit-popup.component';
import { OrderComponent } from './order/order.component';
import { ConfirmPopupComponent } from './Shared/confirm-popup/confirm-popup.component';
import { GlobalErrorHandler } from './global-error-handler';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    CustomersComponent,
    CustomerOrdersPopupComponent,
    CustomerEditPopupComponent,
    OrderComponent,
    ConfirmPopupComponent,
    StatisticsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        preventDuplicates: false
      }
    )
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    CustomersService,
    GlobalSettingsService,
    UserService,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomerOrdersPopupComponent,
    CustomerEditPopupComponent,
    ConfirmPopupComponent
  ]
})
export class AppModule { }
