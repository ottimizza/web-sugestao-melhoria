import { NgModule } from '@angular/core';
import { OutflowComponent } from './page/outflow.component';
import { CommonModule } from '@angular/common';
import { OutflowRoutingModule } from './outflow.routing';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';
import { OutflowModalModule } from '@modules/timeline/outflow-modal/outflow-modal.module';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker/scroll-tracker.module';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [OutflowComponent],
  imports: [
    CommonModule,
    OutflowRoutingModule,
    BreadcrumbModule,
    ActionButtonsModule,
    OutflowModalModule,
    ScrollTrackerModule,
    ComplexSearchModule,
    MatChipsModule,
    MatIconModule
  ],
  entryComponents: [
    OutflowModalModule
  ]
})
export class OutflowModule {}
