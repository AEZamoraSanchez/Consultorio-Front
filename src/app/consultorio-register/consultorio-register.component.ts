import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-consultorio-register',
  standalone: true,
  imports: [ModalRegisterComponent, ReactiveFormsModule],
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
    this._backendService.createConsultorio(this.consultorioForm.value).
    subscribe(consultorio => {
      console.log("Consultorio creado correctamente")
      this.closeModal();
    },
   error => console.error(error)  );
  }

}
