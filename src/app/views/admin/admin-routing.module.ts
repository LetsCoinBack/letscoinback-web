import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminConfigurationComponent } from './configuration/admin-configuration.component';
import { AdminBalanceComponent } from './balance/admin-balance.component';
import { AdminGaurd } from '../../shared/services/admin.gaurd';

const routes: Routes = [
  {
    path: 'configuration',
    component: AdminConfigurationComponent,
    canActivate: [AdminGaurd]
  },
  {
    path: 'balance',
    component: AdminBalanceComponent,
    canActivate: [AdminGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
