import { Login } from "./login";
export class Reservas {
  constructor(
    public reservaId: string,
    public horarioInicio: string,
    public horarioFin: string,
    public canchaNombre: string,
    public bebidaId: string,
    public cantidadBebidas: number,
    public precioTotal: number,
    public email: string
  ) {}

}

export interface ReservasResponse {
  data: Reservas;
}


