import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes'; // URL da API do backend

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  update(id: string, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  buscarDadosCnpj(cnpj: string): Observable<any> {
    return this.http.get<any>(`https://www.cnpj.ws/cnpj/${cnpj}`);
  }
}
