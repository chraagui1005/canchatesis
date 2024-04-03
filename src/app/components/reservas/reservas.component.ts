import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';
import { Observable, map } from 'rxjs';
import { Reservas } from 'src/app/models/reservas';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];

  constructor(private reservasService: ReservasService) {}

  ngOnInit(): void {
    this.obtenerReservas(); // Llama a la función para obtener las reservas al inicializar el componente
    console.log();
  }


  obtenerReservas() {
    this.reservasService.getReservas().subscribe({
      next: (info) => { this.reservas = info.data },
      error: (error) => { console.log("Error: ", error) }
    });
  }

  eliminarReserva(reserva: Reservas) {
    this.reservasService.eliminarReserva(reserva.reservaId).subscribe(
      () => {
        // Eliminar la reserva del array local
        this.reservas = this.reservas.filter(r => r.reservaId !== reserva.reservaId);
        console.log('Reserva eliminada correctamente');
      },
      (error) => {
        console.error('Error al eliminar la reserva:', error);
      }
    );
  }



}
