import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminConfigurationComponent } from './configuration/admin-configuration.component';
import { MasterConfigurationComponent } from './masterconfig/master-configuration.component';
import { ProviderComponent } from './provider/provider.component';
import { AdminBalanceComponent } from './balance/admin-balance.component';
import { AdminGaurd } from '../../shared/services/admin.gaurd';
import { MasterGaurd } from '../../shared/services/master.gaurd';

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
  },
  {
    path: 'master/configuration',
    component: MasterConfigurationComponent,
    canActivate: [MasterGaurd]
  },
  {
    path: 'master/provider',
    component: ProviderComponent,
    canActivate: [MasterGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
