import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../shared/components/shared.components.module';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletBalanceComponent } from './balance/wallet-balance.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({

  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    WalletRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule,
    CurrencyMaskModule
  ],
  declarations: [WalletBalanceComponent]
})
export class WalletModule { }
