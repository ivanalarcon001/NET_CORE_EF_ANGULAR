import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private myAppUrl = 'https://localhost:7184/';
  private myApiUrl = 'api/Libro/'

  constructor(private http: HttpClient) { }

  obtenerLibros(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  guardarLibro(autor: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, autor);
  }

  // eliminarLibro(id: number): Observable<any> {
  //   return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  // }

  // actualizarLibro(id: number, autor: any): Observable<any> {
  //   return this.http.put(this.myAppUrl + this.myApiUrl + id, autor);
  // }  
}
