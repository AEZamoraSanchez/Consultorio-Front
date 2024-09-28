import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-register',
  standalone: true,
  imports: [
    ModalRegisterComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent{

  @Output() closeModalEvent = new EventEmitter<void>();

  doctorForm : FormGroup

  constructor(
    private form : FormBuilder,
    private _backendService : BackendService
  ){
    this.doctorForm = this.form.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(20)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(20)]],
      especialidad: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  closeModal(){
    this.closeModalEvent.emit()
  }

  registrar(): void {

    if(!this.doctorForm.valid){
      this.doctorForm.markAllAsTouched()
      return;
    }

    this._backendService.createDoctor(this.doctorForm.value).
    subscribe(doctor => {
      console.log('Doctor creado correctamente');
      this.closeModal()
    },
    error => console.error(error));
  }

  hasErrors( controlName : string, errorType : string) {
    return this.doctorForm.get(controlName)?.hasError(errorType) && this.doctorForm.get(controlName)?.touched
  }

}
