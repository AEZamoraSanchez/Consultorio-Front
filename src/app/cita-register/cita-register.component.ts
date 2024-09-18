import { Component, OnInit } from '@angular/core';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Consultorio } from '../../interfaces/entidades/Consultorio.interface';
import { Doctor } from '../../interfaces/entidades/Doctor.interface';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-register',
  standalone: true,
  imports: [
    ModalRegisterComponent, ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cita-register.component.html',
  styleUrl: './cita-register.component.css'
})
export class CitaRegisterComponent implements OnInit{

  citaForm : FormGroup;
  consultorios : Consultorio[] = [];
  doctores : Doctor[] = [];

  constructor(
    private form : FormBuilder,
    private _backendService : BackendService
  ) {
    this.citaForm = this.form.group({
      horarioConsulta: ['', [Validators.required]],
      nombrePaciente: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      consultorio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._backendService.getConsultorios().
    subscribe(consultorios => {
      this.consultorios = consultorios;
    },
    error => console.error(error));

    this._backendService.getDoctors().
    subscribe(doctores => {
      this.doctores = doctores;
    },
    error => console.error(error));
  }

  registrar(): void {
    const newCita = {
      horarioConsulta: this.citaForm.value.horarioConsulta,
      nombrePaciente: this.citaForm.value.nombrePaciente,
      doctor: {
        id : this.citaForm.value.doctor
      },
      consultorio: {
        id : this.citaForm.value.consultorio,
      }
    }

    console.log(newCita)
    console.log(this.consultorios)
    console.log(this.doctores)
  }
}
