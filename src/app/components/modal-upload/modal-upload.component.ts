import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { SubirArchivoService } from "src/app/services/service.index";
import { ModalUploadService } from "./modal-upload.service";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    private subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
  }
  subirImagen() {
    this.subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this.modalUploadService.tipo,
        this.modalUploadService.id
      )
      .then(resp => {
        // console.log(resp);
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log("Error en la carga");
      });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      Swal.fire({
        title: "Sólo imagenes",
        text: "El archivo seleccionado no es una imagen",
        icon: "error"
      });
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    //******************Mostrar imagen en la web ******************//
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
    //************************************//
  }
}
