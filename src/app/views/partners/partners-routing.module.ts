import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnersComponent } from './partners/partners.component';
import { RegisterPartnerComponent } from './register/register-partner.component';
import { AdminGaurd } from '../../shared/services/admin.gaurd';

const routes: Routes = [
  {
    path: '',
    component: PartnersComponent
  },
  {
    path: 'register',
    component: RegisterPartnerComponent,
    canActivate: [AdminGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
