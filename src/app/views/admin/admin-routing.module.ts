import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminConfigurationComponent } from './configuration/admin-configuration.component';
import { AdminGaurd } from '../../shared/services/admin.gaurd';

const routes: Routes = [
  {
    path: 'configuration',
    component: AdminConfigurationComponent,
    canActivate: [AdminGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
