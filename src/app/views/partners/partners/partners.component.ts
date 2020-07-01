import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { RestService } from 'src/app/shared/services/rest.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    animations: [SharedAnimations]
})
export class PartnersComponent implements OnInit{
    searchControl: FormControl = new FormControl();
    viewMode: 'list' | 'grid' = 'list';
    page = 1;
    products;
    defaultCashback;
    filteredProducts;
  
    constructor(
      private restService: RestService,
      private auth: AuthService,
      private toastr: ToastrService,
      private router: Router
    ) { }
  
    onNavigate(url){
      if (this.auth.isAuthenticated()) {
        window.open(url, "_blank");
        return;
      }
      this.toastr.warning("Faça login para garantir seu bonus!",'Atenção!');
    }

    editPartner(partner) {
      if (partner["cashback"] == null) {
        delete partner["cashback"];
      }
      if (partner["userCashback"] == null) {
        delete partner["userCashback"];
      }
      if (partner["position"] == null) {
        delete partner["position"];
      }
      this.router.navigate(["/partner/register", partner]);
    }

    ngOnInit() {
      this.restService.callApi("getAllPartners").then(resp => {
        this.products = resp["body"] || [];
        this.filteredProducts = this.products ;
      });
      this.restService.callApi("getDefaultUserCashback").then(resp => {
        this.defaultCashback = resp["body"]["value"];
      });
      this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filerData(value);
      });
    }
  
    filerData(val) {
      if (val) {
        val = val.toLowerCase();
      } else {
        return this.filteredProducts = [...this.products];
      }
  
      const columns = Object.keys(this.products[0]);
      if (!columns.length) {
        return;
      }
      const rows = this.products.filter(function(d) {
          return columns.filter(c => {
            return d[c] && d[c].toString().toLowerCase().indexOf(val) > -1;
          }).length;
      });
      this.filteredProducts = rows;
    }
}
