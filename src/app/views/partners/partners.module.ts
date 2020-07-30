import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TagInputModule } from 'ngx-chips';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners/partners.component';
import { RegisterPartnerComponent } from './register/register-partner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
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
    PartnersRoutingModule,
    TextMaskModule,
    SharedComponentsModule,
    TagInputModule
  ],
  declarations: [PartnersComponent, RegisterPartnerComponent]
})
export class PartnersModule { }
