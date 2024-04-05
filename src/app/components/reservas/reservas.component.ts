import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas.service';
import { Observable, map } from 'rxjs';
import { Reservas } from 'src/app/models/reservas';
import { HttpClient } from '@angular/common/http';
import { ServicioBebidaService } from 'src/app/services/bebidas.service';



@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];
  reservaEliminadaExitosa: boolean = false;

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
    // Obtener el ID de reserva del objeto Reservas
    const reservaId = reserva.reservaId;
    if (!reservaId) {
        console.error('ID de reserva no válido.');
        return;
    }

    // Llamar al servicio para eliminar la reserva
    this.reservasService.eliminarReserva2(reservaId).subscribe(
        () => {
            console.log('Reserva eliminada con éxito.');
            this.obtenerReservas(); // Actualizar la lista de reservas después de eliminar una
            // Mostrar la alerta de eliminación exitosa
            this.mostrarAlertaEliminacionExitosa();
            setTimeout(() => {
              window.location.reload();
            }, 3000);        },
        (error) => {
            console.error('Error al eliminar la reserva:', error);
        }
    );
}

mostrarAlertaEliminacionExitosa() {
    this.reservaEliminadaExitosa = true; // Variable para rastrear si se ha eliminado la reserva con éxito
    setTimeout(() => {
        this.reservaEliminadaExitosa = false; // Ocultar la alerta después de 3 segundos
    }, 3000);
}




}
