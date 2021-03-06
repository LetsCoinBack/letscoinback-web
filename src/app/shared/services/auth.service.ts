import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { RestService } from "./rest.service";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private store: LocalStoreService, private router: Router, private rest:RestService, private toastr: ToastrService) {
  }

  isAuthenticated() {
    return this.store.getItem("auth_user") !=   null;
  }

  
  hasRole (role) {
    let user = this.store.getItem("user") || {};
    let authority = (user["authority"] || "").toUpperCase();
    let roleH = ["USER", "ADMIN", "MASTER"];
    let obj = roleH.find( (o, i) => {
      return role == o && i <= roleH.indexOf(authority);
    });
    return (obj || "").length > 0;
  }

  getuser() {
    return this.store.getItem("user") || {};
  }

  setUser(user) {
    this.store.setItem("user", user);
  }

  signin(credentials, callBack) {
    this.rest.callApi("login", credentials).then(r => {
      this.store.setItem("auth_user", "Bearer " + r["body"]["access_token"]);
      this.rest.callApi("getUser", null, [r["body"]["id"]]).then(r => {
        this.router.navigateByUrl("/");
        this.store.setItem("user", r["body"]);
        this.toastr.success("Seja bem vindo!",r["body"]["name"]);
        if (callBack) callBack();
      });
    }).catch(e => {
      this.store.setItem("auth_user", null);
      this.store.setItem("user", null);
    });
  }

  signout() {
    this.store.setItem("auth_user", null);
    this.store.setItem("user", null);
    this.router.navigateByUrl("/");
  }
}
