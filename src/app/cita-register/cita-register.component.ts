import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Consultorio } from '../../interfaces/entidades/Consultorio.interface';
import { Doctor } from '../../interfaces/entidades/Doctor.interface';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';
import { Cita, CitaDTO } from '../../interfaces/entidades/Cita.interface';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from '../../interfaces/errorResponse.interface';

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

  @Output() closeModalEvent = new EventEmitter<void>();

  citaForm : FormGroup;
  consultorios : Consultorio[] = [];
  doctores : Doctor[] = [];

  constructor(
    private form : FormBuilder,
    private _backendService : BackendService,
    private toastr : ToastrService
  ) {
    this.citaForm = this.form.group({
      horarioConsulta: ['', [Validators.required]],
      nombrePaciente: ['', [Validators.required, Validators.maxLength(20)]],
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

    if( !this.citaForm.valid){
      this.citaForm.markAllAsTouched()
      return;
    }

    const newCita : CitaDTO = {
      horarioConsulta: this.citaForm.value.horarioConsulta,
      nombrePaciente: this.citaForm.value.nombrePaciente,
      doctor: {
        id : this.citaForm.value.doctor
      },
      consultorio: {
        id : this.citaForm.value.consultorio,
      }
    }

    this._backendService.createCita(newCita).
    subscribe(cita => {
      this.toastr.success("Cita creada correctamente");
      setTimeout(() => {
        this.closeModal();
      }, 800);
    },
  (error : ErrorResponse) =>{
     this.toastr.error(error.error.message)
  })
  }

  closeModal(){
    this.closeModalEvent.emit()
  }

  hasErrors( controlName : string, errorType : string) {
    return this.citaForm.get(controlName)?.hasError(errorType) && this.citaForm.get(controlName)?.touched
  }

}
