import { Component, OnInit } from '@angular/core';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-register',
  standalone: true,
  imports: [
    ModalRegisterComponent,
    ReactiveFormsModule

  ],
  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent{

  doctorForm : FormGroup

  constructor(
    private form : FormBuilder
  ){
    this.doctorForm = this.form.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(20)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(20)]],
      especialidad: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  registrar(): void {
    console.log(this.doctorForm.value);
  }

}
