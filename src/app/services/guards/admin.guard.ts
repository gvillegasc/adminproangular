import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService) {}
  canActivate() {
    if (this.usuarioService.usuario.role === "ADMIN_ROLE") {
      return true;
    } else {
      this.usuarioService.logout();
      return false;
    }
  }
}
