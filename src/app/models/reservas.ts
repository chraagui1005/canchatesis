import { Login } from "./login";

export class Reservas {
  constructor(
    public reservaId: string | null,
    public horarioInicio: string,
    public horarioFin: string,
    public canchaNombre: string,
    public bebidaId: string | null,
    public cantidadBebidas: number | null,
    public precioTotal: string,
    public email: string
  ) {}

}

export interface ReservasResponse {
  data: Reservas;
}
