import { NgModule } from '@angular/core';
import { OutflowComponent } from './page/outflow.component';
import { CommonModule } from '@angular/common';
import { OutflowRoutingModule } from './outflow.routing';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';
import { OutflowModalModule } from '@modules/timeline/outflow-modal/outflow-modal.module';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker/scroll-tracker.module';

@NgModule({
  declarations: [OutflowComponent],
  imports: [
    CommonModule,
    OutflowRoutingModule,
    BreadcrumbModule,
    ActionButtonsModule,
    OutflowModalModule,
    ScrollTrackerModule
  ],
  entryComponents: [
    OutflowModalModule
  ]
})
export class OutflowModule {}
