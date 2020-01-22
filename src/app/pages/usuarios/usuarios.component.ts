import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/models/usuario.model";
import { UsuarioService } from "src/app/services/service.index";
import Swal from "sweetalert2";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }
  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal("usuarios", id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.totalUsuarios;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire({
        title: "No puede borrar usuario",
        text: "No se puede borrar a si mismo",
        icon: "error"
      });
      return;
    }
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.usuarioService.borrarUsuario(usuario._id).subscribe(resp => {
          console.log(resp);
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
