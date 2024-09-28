import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultorio-register',
  standalone: true,
  imports: [
    ModalRegisterComponent, ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './consultorio-register.component.html',
  styleUrl: './consultorio-register.component.css'
})
export class ConsultorioRegisterComponent {
  @Output() closeModalEvent = new EventEmitter();

  consultorioForm : FormGroup;

  constructor(
    private form : FormBuilder,
    private _backendService : BackendService
  ) {
    this.consultorioForm = this.form.group({
      numeroConsultorio: ['', [Validators.required, Validators.min(1), Validators.max(100)], ],
      piso: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
   }

   closeModal(){
    this.closeModalEvent.emit()
  }

   registrar(): void {
    if(!this.consultorioForm.valid){
      this.consultorioForm.markAllAsTouched()
      // console.log(this.consultorioForm)
      return
    }
    this._backendService.createConsultorio(this.consultorioForm.value).
    subscribe(consultorio => {
      console.log("Consultorio creado correctamente")
      this.closeModal();
    },
   error => console.error(error)  );
  }

  hasErrors( controlName : string, errorType : string) {
    return this.consultorioForm.get(controlName)?.hasError(errorType) && this.consultorioForm.get(controlName)?.touched
  }

}
