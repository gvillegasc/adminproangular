import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "src/app/config/config";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { UsuarioService } from "../usuario/usuario.service";
import { Medico } from "src/models/medico.model";

@Injectable({
  providedIn: "root"
})
export class MedicoService {
  totalMedicos: number = 0;
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICES + "/medico?desde=" + desde;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.totalMedicos;
        return resp.medicos;
      })
    );
  }

  cargarMedico(id: string) {
    let url = URL_SERVICES + "/medico/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );
  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICES + "/buscador/coleccion/medicos/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );
  }

  borrarMedico(id: string) {
    let url = URL_SERVICES + "/medico/" + id;
    url += "?token=" + this.usuarioService.token;

    return this.http.delete(url).pipe(
      map(resp => {
        Swal.fire({
          title: "Medico borrado",
          text: "El medico fue robado correctamente",
          icon: "success"
        });
        return true;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICES + "/medico";
    if (medico._id) {
      url += "/" + medico._id;
      url += "?token=" + this.usuarioService.token;
      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            title: "Médico Actualizado",
            text: medico.nombre,
            icon: "success"
          });
          return resp.medico;
        })
      );
    } else {
      url += "?token=" + this.usuarioService.token;
      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            title: "Médico Creado",
            text: medico.nombre,
            icon: "success"
          });
          return resp.medico;
        })
      );
    }
  }
}
