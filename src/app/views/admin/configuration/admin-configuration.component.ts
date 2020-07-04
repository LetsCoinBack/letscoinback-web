import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { RestService } from 'src/app/shared/services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './admin-configuration.component.html',
    styleUrls: ['./admin-configuration.component.scss'],
    animations: [SharedAnimations]
})
export class AdminConfigurationComponent implements OnInit{
    formEdit: FormGroup;
    configurations;
    constructor(
      private restService: RestService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private modalService: NgbModal,
    ) { }

    onActivate(event) {
      if(event.type == 'click') {
          this.formEdit.setValue(event.row);
      }
    }

    submit() {
      this.restService.callApi("updateConfiguration", this.formEdit.value).then (r  => {
        this.getConfig();
        this.toastr.success("Dados salvos com sucesso!", "Sucesso!");
      });
    }

    ngOnInit() {
      this.formEdit = this.fb.group({
        key: ['', [Validators.required]],
        description: ['', [Validators.required]],
        value: ['', [Validators.required]]
      });
      this.getConfig();
    }

    getConfig() {
      let vl = {
        key: '',
        description: '',
        value: ''
      }
      this.formEdit.setValue(vl);
      this.restService.callApi("getAllConfiguration").then(r => {
        this.configurations = r["body"];
      });
    }

    confirm(content) {
      if (this.formEdit.invalid) {
        this.toastr.info("Preencha os campos obrigatórios antes de prosseguir.", "Atenção");
        return;
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.submit();
      }, (e) => {});
    }
    
}
