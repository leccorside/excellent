import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {
  cliente: any = {};

  constructor(private clienteService: ClienteService) {}

  buscarDadosCnpj(): void {
    this.clienteService.buscarDadosCnpj(this.cliente.cnpj).subscribe(data => {
      this.cliente.razaoSocial = data.razao_social;
      this.cliente.email = data.email;
    });
  }

  onSubmit(): void {
    this.clienteService.create(this.cliente).subscribe();
  }
}
