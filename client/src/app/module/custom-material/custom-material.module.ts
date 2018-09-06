import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,
    MatRadioModule
  ],
  exports: [MatButtonModule, 
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule],
  declarations: []
})
export class CustomMaterialModule { }
