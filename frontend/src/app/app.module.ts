import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteModule } from './components/cliente/cliente.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProdutoListComponent,
    PedidoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClienteModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
