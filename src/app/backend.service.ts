import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../interfaces/entidades/Doctor.interface';
import { Observable } from 'rxjs';
import { Consultorio } from '../interfaces/entidades/Consultorio.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private urlBackend = "http://localhost:8080";

  constructor(
    private http : HttpClient
  ) { }

  public getDoctors() : Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${this.urlBackend}/doctor`);
  }

  public getConsultorios() : Observable<Consultorio[]>{
    return this.http.get<Consultorio[]>(`${this.urlBackend}/consultorio`);
  }
}
