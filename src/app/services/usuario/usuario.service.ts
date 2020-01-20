import { Injectable } from "@angular/core";
import { Usuario } from "src/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "src/app/config/config";

import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  // Variables del usuario
  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  estaLogueado() {
    if (this.token.length > 5) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.usuario = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("id");

    this.router.navigateByUrl("/login");
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }
    let url = URL_SERVICES + "/usuario/iniciarSesion";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  loginGoogle(token: string) {
    let url = URL_SERVICES + "/usuario/iniciarSesionGoogle";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICES + "/usuario";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          text: usuario.email
        });
        return resp.usuario;
      })
    );
  }
}
