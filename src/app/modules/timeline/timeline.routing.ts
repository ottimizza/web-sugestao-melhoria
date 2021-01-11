import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline.component';
import { SuggestionDisplayComponent } from './suggestion-display/suggestion-display.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: null  },
    component: TimelineComponent
  },
  {
    path: ':suggestionId',
    data: { breadcrumb: null },
    component: SuggestionDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule {}
