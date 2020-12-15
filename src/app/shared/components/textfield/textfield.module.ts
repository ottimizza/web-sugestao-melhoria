import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextfieldComponent } from './textfield.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    TextfieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [TextfieldComponent]
})
export class TextfieldModule { }
