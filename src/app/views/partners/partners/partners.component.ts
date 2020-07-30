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
    segment: FormControl = new FormControl();
    viewMode: 'list' | 'grid' = 'list';
    page = 1;
    products;
    defaultCashback;
    filteredProducts;
    segments;
    constructor(
      private restService: RestService,
      private auth: AuthService,
      private toastr: ToastrService,
      private router: Router
    ) { }
  
    onNavigate(url, param, id){
      if (this.auth.isAuthenticated()) {
        this.restService.callApi("createPreSale", null, [id]).then(r=> {
          let mountUrl = url + "?" + param + "=" + r["body"];
          window.open(mountUrl, "_blank");  
        });
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
      let tpPartner = partner;
      tpPartner["provider"] = partner["provider"]["id"];
      this.router.navigate(["/partner/register", tpPartner], {skipLocationChange: true, replaceUrl: false});
    }

    ngOnInit() {
      this.findSegments();
      this.restService.callApi("getAllPartners").then(resp => {
        this.products = resp["body"] || [];
        this.filteredProducts = this.products ;
      });
      this.restService.callApi("getDefaultUserCashback").then(resp => {
        this.defaultCashback = resp["body"]["value"];
      });
      this.generateEvents();
    }

    generateEvents() {
      this.segment.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filerData(value);
      });
      this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filerData(value);
      });
    }

    findSegments() {
      this.segments = [];
      this.segments[0] = {description: "Todos"};
      this.segment.setValue("Todos");
      this.restService.callApi("getSegments").then(r => {
        this.segments = this.segments.concat(r["body"]);
      });
    }

    filerData(val) {
      if (!val || val == "Todos") {
        return this.filteredProducts = [...this.products];
      }
      val = val.toLowerCase();
      const columns = Object.keys(this.products[0]);
      if (!columns.length) {
        return;
      }
      const rows = this.products.filter(function(d) {
          return columns.filter(c => {
            return d[c] && JSON.stringify(d[c]).toString().toLowerCase().indexOf(val) > -1;
          }).length;
      });
      this.filteredProducts = rows;
    }
}
