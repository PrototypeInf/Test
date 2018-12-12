import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule],
  exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule]
})
export class MaterialModule { }
