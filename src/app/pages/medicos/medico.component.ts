import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from "src/models/hospital.model";
import { HospitalService, MedicoService } from "src/app/services/service.index";
import { Medico } from "src/models/medico.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico("", "", "", "", "");
  hospital: Hospital = new Hospital("");

  constructor(
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params["id"];
      if (id !== "nuevo") {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe((hospitales: any) => {
      this.hospitales = hospitales.hospitales;
    });
    this.modalUploadService.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
      // console.log(resp);
    });
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(["/medico", medico._id]);
    });
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospital(id).subscribe(hospital => {
      this.hospital = hospital;
    });
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal("medicos", this.medico._id);
  }
}
