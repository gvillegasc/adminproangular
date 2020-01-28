import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "src/app/config/config";
import { Usuario } from "src/models/usuario.model";
import { Medico } from "src/models/medico.model";
import { Hospital } from "src/models/hospital.model";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  constructor(
    private activatedRouter: ActivatedRoute,
    private http: HttpClient
  ) {
    activatedRouter.params.subscribe(params => {
      let termino = params["termino"];
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    let url = URL_SERVICES + "/buscador/todo/" + termino;
    this.http.get(url).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
