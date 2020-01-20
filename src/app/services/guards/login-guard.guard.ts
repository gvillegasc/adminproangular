import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate() {
    if (this.usuarioService.estaLogueado()) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
