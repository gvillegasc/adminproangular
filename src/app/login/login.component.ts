import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "src/models/usuario.model";
import Swal from "sweetalert2";

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "677013130041-n9te9v1muno95aqi7khnpmbcumaup1pg.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });
      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(
        resp => {
          window.location.href = "/dashboard";
          //this.router.navigateByUrl("/dashboard");
        },
        err => {
          console.log(err.error.mensaje);
        }
      );
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(
      resp => {
        this.router.navigateByUrl("/dashboard");
      },
      err => {
        Swal.fire({
          title: "Error en el login",
          text: err.error.mensajex,
          icon: "error"
        });
        // console.log(err.error.mensaje);
      }
    );
    // this.router.navigateByUrl("/dashboard");
  }
}
