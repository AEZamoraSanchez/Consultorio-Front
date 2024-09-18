import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

@Component({
  selector: 'app-consultorio-register',
  standalone: true,
  imports: [ModalRegisterComponent, ReactiveFormsModule],
  templateUrl: './consultorio-register.component.html',
  styleUrl: './consultorio-register.component.css'
})
export class ConsultorioRegisterComponent {

  consultorioForm : FormGroup;

  constructor(
    private form : FormBuilder
  ) {
    this.consultorioForm = this.form.group({
      numeroConsultorio: ['', [Validators.required, Validators.min(1), Validators.max(100)], ],
      piso: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
   }

   registrar(): void {
    console.log(this.consultorioForm.value);
  }

}
