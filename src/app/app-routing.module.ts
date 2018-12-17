import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: 'sign', component: UserComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'orders', component: OrderComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
