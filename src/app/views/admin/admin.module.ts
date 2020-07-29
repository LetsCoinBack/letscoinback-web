import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MasterConfigurationComponent } from './masterconfig/master-configuration.component';
import { AdminConfigurationComponent } from './configuration/admin-configuration.component';
import { ProviderComponent } from './provider/provider.component';
import { AdminBalanceComponent } from './balance/admin-balance.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    AdminRoutingModule,
    TextMaskModule,
    NgxEchartsModule,
    SharedComponentsModule
  ],
  declarations: [AdminConfigurationComponent, AdminBalanceComponent, MasterConfigurationComponent, ProviderComponent]
})
export class AdminModule { }
