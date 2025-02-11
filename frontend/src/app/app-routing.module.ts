import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteListComponent },
  { path: 'produtos', component: ProdutoListComponent },  // Placeholder
  { path: 'pedidos', component: PedidoListComponent },   // Placeholder
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
