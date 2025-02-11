import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import consultarCNPJ from "consultar-cnpj";
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  cliente: any = { cnpj: '', razao_social: '', email: '' };
  cnpjInvalido: boolean = false;
  loading: boolean = false; // Adicionado para controlar o estado do loader

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/clientes')
      .subscribe(data => {
        this.clientes = data;
      });
  }

  async consultarCNPJ(): Promise<void> {
    if (this.cliente.cnpj) {
      this.loading = true; // Exibir o loader

      try {
        const empresa = await consultarCNPJ(this.cliente.cnpj);
  
        if (empresa && empresa.razao_social) {
          console.log("Dados retornados:", empresa);

          this.cnpjInvalido = false;
          this.cliente.razao_social = empresa.razao_social;
          this.cliente.email = empresa.estabelecimento.email || '';
        } else {
          this.definirCNPJInvalido();
        }
      } catch (error) {
        this.definirCNPJInvalido();
        console.error("Erro ao consultar CNPJ:", error);
      } finally {
        this.loading = false; // Ocultar o loader após a consulta
      }
    }
  }
  
  private definirCNPJInvalido(): void {
    this.cnpjInvalido = true;
    this.cliente.razao_social = '';
    this.cliente.email = '';
    this.loading = false; // Ocultar o loader
  }

  onSubmit(): void {
    if (this.loading) {
      Swal.fire('Aguarde', 'Ainda estamos consultando o CNPJ.', 'info');
      return;
    }

    if (!this.cnpjInvalido) {
      this.http.post('http://localhost:3000/clientes', this.cliente, { observe: 'response' })
        .subscribe(response => {
          if (response.status === 201) {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Cliente criado com sucesso.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              const modalElement = document.getElementById('cadastroClienteModal');
              if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                  modal.hide();
                  this.closeModal();
                  this.resetForm();
                }
                this.closeModal();
                this.resetForm();
              }
              this.ngOnInit();  // Recarregar os clientes
            });
          } else {
            console.error('Erro ao criar cliente:', response);
            this.showErrorAlert();
          }
        }, (error: HttpErrorResponse) => {
          if (error.status === 201) {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Cliente criado com sucesso.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              const modalElement = document.getElementById('cadastroClienteModal');
              if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                  modal.hide();
                  this.closeModal();
                  this.resetForm();
                }
                this.closeModal();
                this.resetForm();
              }
              this.ngOnInit();  // Recarregar os clientes
            });
          } else {
            console.error('Erro ao criar cliente:', error);
            this.showErrorAlert();
          }
        });
    }
  }

  resetForm(): void {
    this.cliente = { cnpj: '', razao_social: '', email: '' };
    this.cnpjInvalido = false;
  }

  closeModal(): void {
    // Fechar o modal
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modalElement => {
      const modal = window['bootstrap'].Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    });

    // Remover elementos de backdrop
    const backdrops = document.querySelectorAll('.modal-backdrop.show');
    backdrops.forEach(backdrop => {
      backdrop.parentNode?.removeChild(backdrop);
    });

    // Usar setTimeout para esperar um pouco antes de restaurar o comportamento da rolagem
    setTimeout(() => {
      const body = document.querySelector('body');
      if (body) {
        body.classList.remove('modal-open');
        body.style.paddingRight = ''; // Remove o padding aplicado pelo modal
        body.style.overflow = ''; // Remove o overflow hidden
      }
    }, 300); // Ajuste o valor conforme necessário
  }

  deletarCliente(clienteId: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Não, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/clientes/${clienteId}`, { observe: 'response' })
          .subscribe(response => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Deletado!',
                text: 'O cliente foi deletado com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.ngOnInit();  // Recarregar os clientes
              });
            } else {
              this.showErrorAlert();
            }
          }, (error: HttpErrorResponse) => {
            if (error.status === 200) {
                      Swal.fire({
                        title: 'Sucesso!',
                        text: 'Cliente atualizado com sucesso.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then(() => {
                        const modalElement = document.getElementById('cadastroClienteModal');
                        if (modalElement) {
                          const modal = bootstrap.Modal.getInstance(modalElement);
                          if (modal) {
                            modal.hide();
                          }
                        }
                        this.ngOnInit();  // Recarregar os produtos
                      });
                    } else {
                      console.error('Erro ao atualizar produto:', error);
                      this.showErrorAlert();
                    }
          });
      }
    });
  }

  showSuccessAlert(): void {
    Swal.fire({
      title: 'Sucesso!',
      text: 'A operação foi realizada com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.closeModal();
    });
  }

  showErrorAlert(): void {
    Swal.fire({
      title: 'Erro!',
      text: 'Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  showConflictAlert(): void {
    Swal.fire({
      title: 'CNPJ Já Cadastrado!',
      text: 'O CNPJ informado já consta no banco de dados.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}
