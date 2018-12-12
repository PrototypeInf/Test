import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [MatInputModule, MatFormFieldModule, MatTabsModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule],
  // tslint:disable-next-line:max-line-length
  exports: [MatInputModule, MatFormFieldModule, MatTabsModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule]
})
export class MaterialModule { }
