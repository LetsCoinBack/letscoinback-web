import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { RestService } from 'src/app/shared/services/rest.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './register-partner.component.html',
    styleUrls: ['./register-partner.component.scss'],
    animations: [SharedAnimations]
})
export class RegisterPartnerComponent implements OnInit{
    formRegister: FormGroup;
    providers;
    constructor(
      private restService: RestService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private modalService: NgbModal,
      private activeRouter: ActivatedRoute
    ) { }

    changePhoto(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
    }

    setPhoto(url: String) {
      if ("http" != url.substring(0, 4)) {
        this.toastr.info("A URL seleciona não é valida!");
        return;
      }
      let val = this.formRegister.value;
      val["photo"] = url;
      this.formRegister.setValue(val);
      this.modalService.dismissAll();
      this.changeLeft();
    }

    changeLeft(time?) {
      var check = function(){
        let width = document.getElementById("userPhoto").offsetWidth;
        if(width > 0){
          document.getElementById("editPhoto").style.marginLeft = (50 + (width / 2) - 20).toString() + 'px';
        }
        else {
          setTimeout(check, 100);
        }
      }
      setTimeout(check, time || 50);
    }

    submit() {
      this.restService.callApi("registerPartner", this.formRegister.value, [this.formRegister.value["provider"]]).then (r  => {
        this.toastr.success("Dados salvos com sucesso. Você pode confirmar na página de lista de parceiros!", "Sucesso!");
      });
    }

    ngOnInit() {
      this.formRegister = this.getFb();
      this.changeLeft();
      this.getProviders();
    }

    getProviders() {
      this.restService.callApi("getProviders").then(r => {
        this.providers = r["body"];
      });
    }

    getFb() {
      let values = {}; 
      this.activeRouter.params.subscribe(v => {
        values = v;
      },e => {});
      return this.fb.group({
        id: [values["id"]],
        name: [values["name"], [Validators.required]],
        photo: [values["photo"], [Validators.required]],
        redirect: [values["redirect"], [Validators.required]],
        cashback: [values["cashback"] || ''],
        userCashback: [values["userCashback"] || ''],
        position: [values["position"] || ''],
        type: [values["type"] || 'Cashback', [Validators.required]],
        available: [values["available"] || true, [Validators.required]],
        provider: [values["provider"] || '']
      });
    }

    confirm(content) {
      if (this.formRegister.invalid) {
        this.toastr.info("Preencha os campos obrigatórios antes de prosseguir.", "Atenção");
        return;
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.submit();
      }, (e) => {});
    }
    
}
