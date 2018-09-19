import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSlideToggleModule, MatSnackBarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,
    MatRadioModule, BrowserAnimationsModule
  ],
  exports: [MatButtonModule, 
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatStepperModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
