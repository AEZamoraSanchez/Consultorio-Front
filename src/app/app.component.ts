import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CitaRegisterComponent } from './cita-register/cita-register.component';
import { ConsultorioRegisterComponent } from './consultorio-register/consultorio-register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { CommonModule } from '@angular/common';
import { CitaResponse } from '../interfaces/entidades/Cita.interface';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CitaRegisterComponent,
    ConsultorioRegisterComponent,
    DoctorRegisterComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    private _backendService: BackendService
  ){}

  page = signal(0)
  citas : CitaResponse[] = []

  receivedBoolean : string = "";

  registerCita =  signal(false)
  registerConsultorio =  signal(false)
  registerDoctor =  signal(false)

  title = 'consultorio-front';

  ngOnInit(): void {
    this._backendService.getCitas(this.page()).
    subscribe(citas => {
      this.citas = citas.content;
    },
    error => console.error(error));
  }

  showModalRegister(type : string){

    type === "cita" && this.registerCita.set(true);
    type === "consultorio" && this.registerConsultorio.set(true)
    type === "doctor" && this.registerDoctor.set(true)
  }

  receiveBoolean (){
    this.registerCita.set(false)
    this.registerConsultorio.set(false)
    this.registerDoctor.set(false)
  }

  upPage() {
    this.page.set(this.page() + 1);
    this._backendService.getCitas(this.page()).
    subscribe(citas => {
      this.citas = citas.content;
    },
    error => console.error(error));
  }

  downPage() {
    this.page.set(this.page() - 1);
    this._backendService.getCitas(this.page()).
    subscribe(citas => {
      this.citas = citas.content;
    },
    error => console.error(error));
  }
}
