import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ComplexSearchInputComponent } from '@shared/components/search/complex-search.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ComplexSearchInputComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    ComplexSearchInputComponent
  ],
  providers: [
  ],
  entryComponents: [
    ComplexSearchInputComponent
  ]
})
export class ComplexSearchModule { }
