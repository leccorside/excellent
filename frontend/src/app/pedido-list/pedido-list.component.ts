import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {
  pedidos: any[] = [];
  clientes: any[] = [];
  produtos: any[] = [];
  novoPedido: any = { cliente_id: '', produtos: [] };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarPedidos();
    this.carregarClientes();
    this.carregarProdutos();
  }

  carregarPedidos(): void {
    this.http.get<any[]>('http://localhost:3000/pedidos')
      .subscribe(data => this.pedidos = data);
  }

  carregarClientes(): void {
    this.http.get<any[]>('http://localhost:3000/clientes')
      .subscribe(data => this.clientes = data);
  }

  carregarProdutos(): void {
    this.http.get<any[]>('http://localhost:3000/produtos')
      .subscribe(data => {
        this.produtos = data;
        console.log('Produtos carregados:', this.produtos);
      });
  }

  adicionarProduto(): void {
    this.novoPedido.produtos.push({ produto_id: '', quantidade: 1 });
  }

  removerProduto(index: number): void {
    this.novoPedido.produtos.splice(index, 1);
  }

  onSubmitPedido(): void {
    let valorTotal = 0;

    this.novoPedido.produtos = this.novoPedido.produtos.map(produtoPedido => {
      const produto = this.produtos.find(p => p.id === Number(produtoPedido.produto_id));
      if (produto && produto.valor_venda) {
        produtoPedido.valor_venda = produto.valor_venda;
        produtoPedido.valor_total = produto.valor_venda * produtoPedido.quantidade;
        valorTotal += produtoPedido.valor_total;
      } else {
        console.error('Produto sem valor_venda:', produtoPedido);
      }
      return produtoPedido;
    });

    if (valorTotal === 0) {
      Swal.fire('Erro!', 'Nenhum produto válido foi selecionado.', 'error');
      return;
    }

    this.novoPedido.valor_total = valorTotal;
    console.log('Enviando pedido:', JSON.stringify(this.novoPedido, null, 2));

    this.http.post('http://localhost:3000/pedidos', this.novoPedido, { observe: 'response' })
      .subscribe(response => {
        if (response.status === 201) {
                  Swal.fire({
                    title: 'Sucesso!',
                    text: 'Pedido criado com sucesso.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    // Fechar o modal usando Bootstrap diretamente
                    const modalElement = document.getElementById('cadastroPedidoModal');
                    if (modalElement) {
                      const modal = bootstrap.Modal.getInstance(modalElement);
                      if (modal) {
                        modal.hide();
                        this.closeModal();
                      }
                      this.closeModal();
                    }
                    this.ngOnInit();  // Recarregar os pedidos
                  });
                } else {
                  this.showErrorAlert();
                }
      }, (error: HttpErrorResponse) => {
        if (error.status === 201) {
                  Swal.fire({
                    title: 'Sucesso!',
                    text: 'Pedido criado com sucesso.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    const modalElement = document.getElementById('cadastroPedidoModal');
                    if (modalElement) {
                      const modal = bootstrap.Modal.getInstance(modalElement);
                      if (modal) {
                        modal.hide();
                        this.closeModal();
                      }
                      this.closeModal();
                    }
                    this.ngOnInit();  // Recarregar os pedidos
                  });
                } else {
                  console.error('Erro ao criar pedido:', error);
                  this.showErrorAlert();
                }
      });
  }

  deletarPedido(pedidoId: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Não, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/pedidos/${pedidoId}`, { observe: 'response' })
          .subscribe(response => {
            if (response.status === 200) {
                          Swal.fire({
                            title: 'Deletado!',
                            text: 'O pedido foi deletado com sucesso.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          }).then(() => {
                            this.ngOnInit();  // Recarregar os produtos
                          });
                        } else {
                          this.showErrorAlert();
                        }
          }, (error: HttpErrorResponse) => {
            if (error.status === 200) {
                          Swal.fire({
                            title: 'Deletado!',
                            text: 'O pedido foi deletado com sucesso.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          }).then(() => {
                            this.ngOnInit();  // Recarregar os produtos
                          });
                        } else {
                          console.error('Erro ao deletar pedido:', error);
                          this.showErrorAlert();
                        }
          });
      }
    });
  }

  resetPedidoForm(): void {
    this.novoPedido = { cliente_id: '', produtos: [] };
  }

  closeModal(): void {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modalElement => {
      const modal = window['bootstrap'].Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    });

    const backdrops = document.querySelectorAll('.modal-backdrop.show');
    backdrops.forEach(backdrop => backdrop.parentNode?.removeChild(backdrop));

    setTimeout(() => {
      const body = document.querySelector('body');
      if (body) {
        body.classList.remove('modal-open');
        body.style.paddingRight = '';
        body.style.overflow = '';
      }
    }, 300);
  }

  showSuccessAlert(): void {
    Swal.fire('Sucesso!', 'A operação foi realizada com sucesso.', 'success')
      .then(() => this.closeModal());
  }

  showErrorAlert(): void {
    Swal.fire('Erro!', 'Ocorreu um erro ao realizar a operação. Por favor, tente novamente.', 'error');
  }
}
