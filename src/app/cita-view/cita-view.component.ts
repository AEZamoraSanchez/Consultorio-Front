import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { CommonModule } from '@angular/common';
import { BackendService } from '../backend.service';
import { CitaResponse } from '../../interfaces/entidades/Cita.interface';

@Component({
  selector: 'app-cita-view',
  standalone: true,
  imports: [
    ModalRegisterComponent,
    CommonModule
  ],

  templateUrl: './cita-view.component.html',
  styleUrl: './cita-view.component.css'
})
export class CitaViewComponent implements OnInit {

  @Input() citaId : number = 0;
  @Output() closeModalEvent = new EventEmitter<void>();

  cita : CitaResponse | null = null;

  constructor(
    private _backendService: BackendService
  ) { }
  ngOnInit(): void {
    this._backendService.getCitaById(this.citaId).
    subscribe(cita => {
      this.cita = cita;
    },
    error => console.error(error))
  }

  closeModal(){
    this.closeModalEvent.emit()
  }
}
