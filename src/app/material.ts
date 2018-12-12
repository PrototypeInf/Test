import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule],
  exports: [MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule]
})
export class MaterialModule { }
