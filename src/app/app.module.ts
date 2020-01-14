import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

//Rutas
import { AppRoutingModule } from "./app-routing.module";

//Modulo
import { PagesModule } from "./pages/pages.module";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

import { FormsModule } from "@angular/forms";

// Serivicios
import { ServiceModule } from "./services/service.module";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
