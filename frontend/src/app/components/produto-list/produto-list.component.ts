import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  produtos: any[] = [];
  produto: any = { descricao: '', valor_venda: '', estoque: '' };
  imagens: File[] = [];
  produtoSelecionado: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/produtos')
      .subscribe(data => {
        this.produtos = data.map(produto => ({
          ...produto,
          imagens: JSON.parse(produto.imagens)
        }));
      });
  }

  onFileChange(event: any): void {
    this.imagens = event.target.files;
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('descricao', this.produto.descricao);
    formData.append('valor_venda', this.produto.valor_venda);
    formData.append('estoque', this.produto.estoque);
    for (let i = 0; i < this.imagens.length; i++) {
      formData.append('imagens', this.imagens[i]);
    }

    const headers = new HttpHeaders({
      enctype: 'multipart/form-data'
    });

    this.http.post('http://localhost:3000/produtos', formData, { observe: 'response' })
      .subscribe(response => {
        if (response.status === 201) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Produto criado com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            const modalElement = document.getElementById('cadastroProdutoModal');
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
            this.ngOnInit();  // Recarregar os produtos
          });
        } else {
          console.error('Erro ao criar produto:', response);
          this.showErrorAlert();
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 201) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Produto criado com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            const modalElement = document.getElementById('cadastroProdutoModal');
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
            this.ngOnInit();  // Recarregar os produtos
          });
        } else {
          console.error('Erro ao criar produto:', error);
          this.showErrorAlert();
        }
      });
  }

  verProduto(produtoId: number): void {
    this.produtoSelecionado = this.produtos.find(p => p.id === produtoId);
    const modalElement = document.getElementById('verProdutoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  editarProduto(): void {
    const formData = new FormData();
    formData.append('descricao', this.produtoSelecionado.descricao);
    formData.append('valor_venda', this.produtoSelecionado.valor_venda);
    formData.append('estoque', this.produtoSelecionado.estoque);
  
    // Adicionar novas imagens somente se forem selecionadas
    if (this.imagens.length > 0) {
      for (let i = 0; i < this.imagens.length; i++) {
        formData.append('imagens', this.imagens[i]);
      }
    } else {
      // Manter as imagens existentes se nenhuma nova imagem for selecionada
      formData.append('imagens', JSON.stringify(this.produtoSelecionado.imagens));
    }
  
    const headers = new HttpHeaders({
      enctype: 'multipart/form-data'
    });
  
    this.http.put(`http://localhost:3000/produtos/${this.produtoSelecionado.id}`, formData, { observe: 'response' })
      .subscribe(response => {
        if (response.status === 200) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Produto atualizado com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Fechar o modal usando Bootstrap diretamente
            const modalElement = document.getElementById('verProdutoModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              if (modal) {
                modal.hide();
              }
            }
            this.ngOnInit();  // Recarregar os produtos
          });
        } else {
          this.showErrorAlert();
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 200) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Produto atualizado com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            const modalElement = document.getElementById('verProdutoModal');
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
  
  
  deletarProduto(produtoId: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Não, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/produtos/${produtoId}`, { observe: 'response' })
          .subscribe(response => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Deletado!',
                text: 'O produto foi deletado com sucesso.',
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
                text: 'O produto foi deletado com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.ngOnInit();  // Recarregar os produtos
              });
            } else {
              console.error('Erro ao deletar produto:', error);
              this.showErrorAlert();
            }
          });
      }
    });
  }
  

  resetForm(): void {
    this.produto = { descricao: '', valor_venda: '', estoque: '' };
    this.imagens = [];
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
      text: 'Ocorreu um erro ao realizar a operação. Por favor, tente novamente.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
