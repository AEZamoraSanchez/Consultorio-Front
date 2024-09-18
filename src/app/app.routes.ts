import { Routes } from '@angular/router';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { ConsultorioRegisterComponent } from './consultorio-register/consultorio-register.component';
import { CitaRegisterComponent } from './cita-register/cita-register.component';

export const routes: Routes = [
  { path: 'modal', component: ModalRegisterComponent},
  // { path: 'modal-doctor', component: ConsultorioRegisterComponent}
  { path: 'modal-doctor', component: CitaRegisterComponent}
  // { path: 'modal-doctor', component: DoctorRegisterComponent}

];
