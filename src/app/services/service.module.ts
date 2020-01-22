import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService
} from "./service.index";
import { HttpClientModule } from "@angular/common/http";
import { LoginGuardGuard } from "./guards/login-guard.guard";
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    ModalUploadComponent
  ],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}
