import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// HttpClient
import { HttpClientModule } from "@angular/common/http";

//Rutas
import { AppRoutingModule } from "./app-routing.module";

//Modulo
import { PagesModule } from "./pages/pages.module";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Servicios
import { ServiceModule } from "./services/service.module";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
