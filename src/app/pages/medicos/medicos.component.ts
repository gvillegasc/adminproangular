import { Component, OnInit } from "@angular/core";
import { MedicoService } from "src/app/services/service.index";
import { Medico } from "src/models/medico.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number;
  constructor(public medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde).subscribe(
      medicos => {
        this.medicos = medicos;
        this.cargando = false;
        this.totalRegistros = this.medicoService.totalMedicos;
      },
      err => {
        this.cargando = false;
        console.log(err);
      }
    );
  }

  buscarMedico(termino: string) {
    // console.log(termino);
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this.medicoService.buscarMedicos(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Esta a punto de borrar a " + medico.nombre,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.medicoService.borrarMedico(medico._id).subscribe(resp => {
          this.cargarMedicos();
        });
      }
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
    this.cargarMedicos();
  }
}
