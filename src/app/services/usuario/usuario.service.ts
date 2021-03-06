import { Injectable } from "@angular/core";
import { Usuario } from "src/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "src/app/config/config";

import { map, catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  // Variables del usuario
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICES + "/usuario/renovarToken";
    url += "?token=" + this.token;
    this.http.get(url);
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem("token", this.token);
        return true;
      })
    );
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
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
    localStorage.removeItem("menu");

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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
    );
  }

  loginGoogle(token: string) {
    let url = URL_SERVICES + "/usuario/iniciarSesionGoogle";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICES + "/usuario/" + usuario._id;
    url += "?token=" + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuario, this.menu);
        }

        Swal.fire({
          title: "Usuario actualizado",
          text: usuario.nombre,
          icon: "success"
        });
        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, "usuarios", id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire({
          title: "Imagen Actualizada",
          text: this.usuario.nombre,
          icon: "success"
        });
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(err => {
        console.log(err);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICES + "/usuario?desde=" + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICES + "/buscador/coleccion/usuarios/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.usuarios;
      })
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICES + "/usuario/" + id;
    url += "?token=" + this.token;

    return this.http.delete(url).pipe(
      map(resp => {
        Swal.fire({
          title: "Usuario borrado",
          text: "El usuario fue robado correctamente",
          icon: "success"
        });
        return true;
      })
    );
  }
}
