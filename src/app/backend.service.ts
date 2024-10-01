import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../interfaces/entidades/Doctor.interface';
import { Observable } from 'rxjs';
import { Consultorio } from '../interfaces/entidades/Consultorio.interface';
import { AllCitas, Cita, CitaDTO, CitaResponse } from '../interfaces/entidades/Cita.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private urlBackend = environment.backendUrl;

  constructor(
    private http : HttpClient
  ) { }

  public getDoctors() : Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${this.urlBackend}/doctor`);
  }

  public createDoctor(doctor : Doctor) : Observable<Doctor>{
    return this.http.post<Doctor>(`${this.urlBackend}/doctor`, doctor);
  }

  public getConsultorios() : Observable<Consultorio[]>{
    return this.http.get<Consultorio[]>(`${this.urlBackend}/consultorio`);
  }
  public createConsultorio(consultorio : Consultorio) : Observable<Consultorio>{
    return this.http.post<Consultorio>(`${this.urlBackend}/consultorio`, consultorio);
  }
  public getCitaById (citaId : number) : Observable<CitaResponse>{
    return this.http.get<CitaResponse>(`${this.urlBackend}/cita/${citaId}`);
  }
  public getCitas(page : number) : Observable<AllCitas>{
    return this.http.get<AllCitas>(`${this.urlBackend}/cita/all/${page}`);
  }
  public createCita(cita : CitaDTO) : Observable<CitaResponse>{
    return this.http.post<CitaResponse>(`${this.urlBackend}/cita`, cita);
  }

}
