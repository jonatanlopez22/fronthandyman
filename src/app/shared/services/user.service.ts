import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicioNew } from 'src/app/models/ServicioNew';
import { Servicio } from 'src/app/models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDias(fechaI: string, fechaF: string) {
    return this.http.get('http://localhost:8080/calcularDias?fechaI=' + fechaI + '&fechaF=' + fechaF).pipe(map((response) => response));
  }

  getCalcularH(horaI: number, horaF: number, fechaI: string, fechaF: string) {
    return this.http.get('http://localhost:8080/calcularHoras?horaI=' + horaI + '&horaF=' + horaF + '&fechaI=' + fechaI + '&fechaF=' + fechaF).pipe(map((response) => response));
  }

  getSemanai(fechaI: String) {
    return this.http.get('http://localhost:8080/calcularSem?fecha=' + fechaI).pipe(map((response) => response));
  }

  getSemanaf(fechaF: String) {
    return this.http.get('http://localhost:8080/calcularSem?fecha=' + fechaF).pipe(map((response) => response));
  }

  saveReporte(servicioNew: ServicioNew): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(servicioNew);

    return this.http.post('http://localhost:8080/registrar', body, { 'headers': headers });
  }

  getEmpleado(idEmpleado: number, semana: number) {
    return this.http.get<Servicio[]>('http://localhost:8080/consultar?idEmpleado=' + idEmpleado + '&semana=' + semana);
  }

  getCalHNoc1(horaI1: number, horaF1: number, fechaI1: string, fechaF1: string, horaN: number) {
    return this.http.get('http://localhost:8080/calcularHoraN1?horaI=' + horaI1 + '&horaF=' + horaF1 + '&fechaI=' + fechaI1 + '&fechaF=' + fechaF1 + '&horaN=' + horaN).pipe(map((response) => response));
  }

  getCalHNoc2(horaI2: number, horaF2: number, fechaI2: string, fechaF2: string, horaN: number) {
    return this.http.get('http://localhost:8080/calcularHoraN1?horaI=' + horaI2 + '&horaF=' + horaF2 + '&fechaI=' + fechaI2 + '&fechaF=' + fechaF2 + '&horaN=' + horaN).pipe(map((response) => response));
  }

  getCalN1(num1: number, num2: number) {
    return this.http.get('http://localhost:8080/calcularHoraN2?num1=' + num1 + '&num2=' + num2).pipe(map((response) => response));
  }


  getCalHDiu1(horaI1: number, horaF1: number, fechaI1: string, fechaF1: string, horaN: number) {
    return this.http.get('http://localhost:8080/calcularHoraN1?horaI=' + horaI1 + '&horaF=' + horaF1 + '&fechaI=' + fechaI1 + '&fechaF=' + fechaF1 + '&horaN=' + horaN).pipe(map((response) => response));
  }

  getCalHDiu2(horaI2: number, horaF2: number, fechaI2: string, fechaF2: string, horaN: number) {
    return this.http.get('http://localhost:8080/calcularHoraN1?horaI=' + horaI2 + '&horaF=' + horaF2 + '&fechaI=' + fechaI2 + '&fechaF=' + fechaF2 + '&horaN=' + horaN).pipe(map((response) => response));
  }


  getCalcularHN(horaI1: number, horaF1: number, fechaI1: string, fechaF1: string) {
    return this.http.get('http://localhost:8080/calcularHoras?horaI=' + horaI1 + '&horaF=' + horaF1 + '&fechaI=' + fechaI1 + '&fechaF=' + fechaF1).pipe(map((response) => response));
  }

  getDia(fecha: String) {
    return this.http.get('http://localhost:8080/dia?fecha=' + fecha, { responseType: 'text' }).pipe(map((response) => response));
  }
 

}