import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultorio-register',
  standalone: true,
  imports: [
    ModalRegisterComponent,
    ReactiveFormsModule,
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
    private _backendService : BackendService,
    private toastr : ToastrService
  ) {
    this.consultorioForm = this.form.group({
      numeroConsultorio: ['', [Validators.required, Validators.min(1), Validators.max(100)], ],
      piso: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
   }

   closeModal(){
    this.closeModalEvent.emit()
    this.toastr.clear()
  }

   registrar(): void {
    if(!this.consultorioForm.valid){
      this.consultorioForm.markAllAsTouched()
      // console.log(this.consultorioForm)
      return
    }
    this._backendService.createConsultorio(this.consultorioForm.value).
    subscribe(consultorio => {
      this.toastr.success("Consultorio creado")

      setTimeout(() => {
        this.closeModal();
      }, 800);
    },
   error => this.toastr.error("No se pudo crear el consultorio")  );
  }

  hasErrors( controlName : string, errorType : string) {
    return this.consultorioForm.get(controlName)?.hasError(errorType) && this.consultorioForm.get(controlName)?.touched
  }

}
