import { Injectable } from "@angular/core";
import { URL_SERVICES } from "src/app/config/config";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Hospital } from "src/models/hospital.model";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class HospitalService {
  // Variables del usuario
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICES + "/hospital?desde=" + desde;
    return this.http.get(url);
  }

  buscarHospitales(termino: string) {
    let url = URL_SERVICES + "/buscador/coleccion/hospitales/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    );
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICES + "/hospital/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICES + "/hospital/" + id;
    url += "?token=" + this.usuarioService.token;

    return this.http.delete(url).pipe(
      map(resp => {
        Swal.fire({
          title: "Hospital borrado",
          text: "El hospital fue robado correctamente",
          icon: "success"
        });
        return true;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICES + "/hospital/" + hospital._id;
    url += "?token=" + this.usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          title: "Hospital actualizado",
          text: hospital.nombre,
          icon: "success"
        });
        return true;
      })
    );
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICES + "/hospital";
    url += "?token=" + this.usuarioService.token;
    return this.http.post(url, { nombre }).pipe(
      map((resp: any) => {
        resp.hospital;
      })
    );
  }
}
