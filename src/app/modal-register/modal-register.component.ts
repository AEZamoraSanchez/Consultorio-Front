import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-register',
  standalone: true,
  imports: [],
  templateUrl: './modal-register.component.html',
  styleUrl: './modal-register.component.css'
})
export class ModalRegisterComponent {
  @Output() closeEvent = new EventEmitter<void>();

  closeModal (){
    this.closeEvent.emit()
  }
}
