import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { TimelineComponent } from '@modules/timeline/timeline.component';
import { LandPageComponent } from '@modules/land-page/page/land-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full'
  },
  {
    path: 'landpage',
    data: {
      breadcrumb: null
    },
    component: LandPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'timeline',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard], // Should be replaced with actual auth guard
    data: {
      breadcrumb: 'Timeline'
    },
    children: [
      {
        path: '',
        redirectTo: 'sugestoes',
        pathMatch: 'full'
      },
      {
        path: 'sugestoes',
        data: {
          breadcrumb: null
        },
        loadChildren: () => import('@modules/timeline/timeline.module').then(m => m.TimelineModule),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'desabafos',
      //   data: {
      //     breadcrumb: 'Desabafos'
      //   },
      //   loadChildren: () => import('@modules/outflow/outflow.module').then(m => m.OutflowModule),
      //   canActivate: [AuthGuard]
      // }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
