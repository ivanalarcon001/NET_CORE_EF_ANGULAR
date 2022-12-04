import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutorService {
  private myAppUrl = 'https://localhost:7184/';
  private myApiUrl = 'api/Autor/'

  constructor(private http: HttpClient) { }

  obtenerAutores(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  guardarAutor(autor: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, autor);
  }

  // eliminarAutor(id: number): Observable<any> {
  //   return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  // }

  // actualizarAutor(id: number, autor: any): Observable<any> {
  //   return this.http.put(this.myAppUrl + this.myApiUrl + id, autor);
  // }
}
