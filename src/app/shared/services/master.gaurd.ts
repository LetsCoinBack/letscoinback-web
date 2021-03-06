import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MasterGaurd implements CanActivate {

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.auth.hasRole('MASTER')) {
        return true;
    } else {
        this.toastr.warning("Você não tem permissão para entrar nesta página!")
        this.router.navigateByUrl('/');
        return false;
    }
  }
}