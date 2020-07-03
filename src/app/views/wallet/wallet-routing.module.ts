import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletBalanceComponent } from './balance/wallet-balance.component';
import { AuthGaurd } from '../../shared/services/auth.gaurd';

const routes: Routes = [
  {
    path: 'balance',
    component: WalletBalanceComponent,
    canActivate: [AuthGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
