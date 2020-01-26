import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/service.index";
import { Hospital } from "src/models/hospital.model";
import Swal from "sweetalert2";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = true;

  desde: number = 0;

  totalRegistros: number = 0;

  hospitales: Hospital[] = [];
  constructor(
    private hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal("hospitales", id);
  }

  crearHospital() {
    Swal.fire({
      title: "Crear hospital",
      text: "Coloque el nombre del hospital",
      input: "text",
      icon: "info",
      inputValidator: value => {
        if (!value) {
          return "Tiene que colocar un nombre";
        } else {
          this.hospitalService.crearHospital(value).subscribe(() => {
            this.cargarHospitales();
          });
        }
      }
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.totalHospitales;
      this.hospitales = resp.hospitales;
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
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    console.log(termino);
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalService
      .buscarHospitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Esta a punto de borrar a " + hospital.nombre,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }
}
