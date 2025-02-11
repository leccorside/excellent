import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';  // Adicionar FormsModule para suporte aos formulários
import { ClienteListComponent } from '../cliente-list/cliente-list.component';

@NgModule({
  declarations: [
    ClienteListComponent
  ],
  imports: [
    CommonModule,
    FormsModule  // Importar FormsModule
  ],
  exports: [
    ClienteListComponent
  ]
})
export class ClienteModule { }
