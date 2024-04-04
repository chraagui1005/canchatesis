import { Login } from "./login";
export class Bebidas {
  constructor(
    public bebidaId: string,
    public precioBebida: number,
    public stockBebida: number,
    public imagenBebida: string,

  ) {}

}

export interface ReservasResponse {
  data: Bebidas;
}


