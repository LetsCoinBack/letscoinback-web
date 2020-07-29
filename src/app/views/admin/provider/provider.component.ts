import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { RestService } from 'src/app/shared/services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss'],
    animations: [SharedAnimations]
})
export class ProviderComponent implements OnInit{
    formEdit: FormGroup;
    providers;
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
      this.restService.callApi("updateProvider", this.formEdit.value).then (r  => {
        this.getConfig();
        this.toastr.success("Dados salvos com sucesso!", "Sucesso!");
      });
    }

    ngOnInit() {
      this.formEdit = this.fb.group({
        id: [''],
        name: ['', ],
        user: ['', [Validators.required]],
        password: [''],
        publisher: ['', [Validators.required]],
        paramSend: ['', [Validators.required]],
        url: ['', [Validators.required]]
      });
      this.formEdit.get("name").disable();

      this.getConfig();
    }

    getConfig() {
      let vl = {
        id: '',
        name: '',
        user: '',
        password: '',
        publisher: '',
        paramSend: '',
        url: ''
      }
      this.formEdit.setValue(vl);
      this.restService.callApi("getMasterProviders").then(r => {
        this.providers = r["body"];
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
