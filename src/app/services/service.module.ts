// Angular imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

// Guards
import { LoginGuardGuard } from "./guards/login-guard.guard";
import { AdminGuard } from "./guards/admin.guard";
import { VerificaTokenGuard } from "./guards/verifica-token.guard";

// Services
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  SubirArchivoService
} from "./service.index";

// Components
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    SubirArchivoService,
    ModalUploadComponent,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}
