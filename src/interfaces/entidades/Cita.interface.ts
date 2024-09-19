import { Consultorio } from './Consultorio.interface';
import { Doctor } from "./Doctor.interface"

export interface Cita {
  id ? : number
  horarioConsulta: string
  nombrePaciente: string
}

export interface CitaResponse extends Cita {
  doctor: Doctor
  consultorio: Consultorio
}

export interface CitaDTO extends Cita {
  doctor: {
    id: number
  }
  consultorio : {
    id: number
  }
}

export interface AllCitas {
  content: CitaResponse[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  size: number
  number: number
  sort: Sort2
  numberOfElements: number
  empty: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Sort2 {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
