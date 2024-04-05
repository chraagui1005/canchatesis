import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bebidas } from 'src/app/models/bebidas';
import { ServicioBebidaService } from 'src/app/services/bebidas.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { Reservas } from 'src/app/models/reservas';
import { ChangeDetectorRef } from '@angular/core';

interface Court {
  id: number;
  canchaNombre: string;
  horarioInicio: string;
  horarioFin: string;
  precioCancha: number;
  estado: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

interface Bebida {
  bebidaId: string;
  precioBebida: number;
  stockBebida: number;
  imagenBebida: string; // Agrega la propiedad imagenBebida al tipo Bebida
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.css']
})
export class DisponibilidadComponent {
  courts: string[] = [];
  selectedCourt: string | null = null;
  courtEntries: Court[] = [];
  courtDetails: any | null = null; // Aquí defines courtDetails
  selectedDate: Date | null = null;
  selectedEntry: Court | null = null; // Nueva propiedad para almacenar la fila seleccionada
  canchaSeleccionada: boolean = false; // Variable para rastrear si se ha seleccionado una cancha
  reservarBebidas: boolean = false; // Variable para rastrear si se desea reservar bebidas
  horarioSeleccionado: boolean = false; // Variable para rastrear si se ha seleccionado un horario
  bebidas: Bebida[] = [];
  bebidaSeleccionada: Bebida | null = null;
  bebidaSeleccionada2: boolean = false;

  cantidad: number = 0;
  reservaGuardada: boolean = false; // Variable para rastrear
  reservaGuardada2: boolean = false; // Variable para rastrear

  detalleBebida: any[] = [];


  constructor(private http: HttpClient, private servicioBebida: ServicioBebidaService, private reservasService: ReservasService, private cdr: ChangeDetectorRef) {
    this.fetchCourts();
  }


  fetchCourts() {
    this.http.get<ApiResponse<Court[]>>("http://localhost/api/canchas").subscribe(
      (response) => {
        if (response.statusCode === 200 && response.data) {
          const uniqueCourts = this.extractUniqueCourtNames(response.data);
          this.courts = uniqueCourts;
        } else {
          console.error("Error al obtener los nombres de las canchas");
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }

  extractUniqueCourtNames(data: Court[]): string[] {
    return data.reduce((unique: string[], current) => {
      if (!unique.includes(current.canchaNombre)) {
        unique.push(current.canchaNombre);
      }
      return unique;
    }, []);
  }

  onCourtSelected() {
    if (this.selectedCourt) {
      const url = `http://localhost/api/canchas/${this.selectedCourt}`;
      this.http.get<ApiResponse<Court[]>>(url).subscribe(
        (response) => {
          this.courtEntries = response.data;
        },
        (error) => {
          console.error("Error en la solicitud HTTP:", error);
        }
      );
    } else {
      this.courtEntries = [];
    }
  }

  filterCourtEntriesByDate(entries: Court[], formattedDate: string) {
    this.courtEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.horarioInicio);
      return entryDate.toISOString().split('T')[0] === formattedDate;
    });
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    if (this.selectedCourt && this.selectedDate) {
      const formattedDate = this.selectedDate.toISOString().split('T')[0];
      const url = `http://localhost/api/canchas/${this.selectedCourt}?date=${formattedDate}`;
      this.http.get<ApiResponse<Court[]>>(url).subscribe(
        (response) => {
          if (response && Array.isArray(response.data)) {
            if (response.data.length > 0) {
              this.filterCourtEntriesByDate(response.data, formattedDate);
            } else {
              this.courtEntries = [];
              console.log('No hay reservas disponibles para este día.');
            }
          } else {
            console.error("Los datos recibidos no están en el formato esperado:", response);
          }
        },
        (error) => {
          console.error("Error en la solicitud HTTP:", error);
        }
      );
    }
  }


  seleccionarHorario(entry: Court) {
    if (this.selectedEntry === entry) {
      // Si ya se ha seleccionado esta entrada, cancelar la selección
      this.cancelarSeleccion();
      console.log();

    } else {
      // Si es una nueva entrada, seleccionarla
      this.selectedEntry = entry;
      console.log('Horario seleccionado:', entry);
      this.horarioSeleccionado = true; // Actualiza la variable de horario seleccionado
      console.log(this.horarioSeleccionado);

    }
  }


  cancelarSeleccion() {
    this.selectedEntry = null; // Limpiar la entrada seleccionada
  }


  obtenerBebidas() {
    if (!this.reservarBebidas) {
      this.bebidas = []; // Si reservarBebidas es false, asigna un array vacío a bebidas
      return; // Sal del método para evitar la llamada al servicio
    }

    this.servicioBebida.getBebidas().subscribe(
      (response) => {
        this.bebidas = response.data;
      },
      (error) => {
        console.error('Error al obtener las bebidas:', error);
      }
    );
  }

  seleccionarBebida(bebida: Bebida) {
    // Verifica si la bebida seleccionada ya es la misma que la que se está seleccionando ahora
    if (this.bebidaSeleccionada === bebida) {
      // Si es la misma bebida, deseleccionarla
      this.bebidaSeleccionada = null;
      console.log(this.bebidaSeleccionada)
      this.cantidad = 0; // Reiniciar el contador

        } else {
      // Si es una bebida diferente, seleccionarla
      this.bebidaSeleccionada = bebida;
      this.cantidad = 1; // Reiniciar el contador
    }
  }


  incrementarContador() {
    if (this.cantidad < this.bebidaSeleccionada!.stockBebida) {
      this.cantidad++;
      console.log(this.cantidad);
      this.cdr.detectChanges(); // Forzar detección de cambios

    }
  }

  decrementarContador() {
    if (this.cantidad > 0) {
      this.cantidad--;
      this.cdr.detectChanges(); // Forzar detección de cambios

    }
  }

  guardar() {
    if (!this.reservarBebidas && this.selectedEntry) {
      const { horarioInicio, horarioFin, canchaNombre, precioCancha } = this.selectedEntry;

      // Crear una nueva instancia de Reservas con los datos necesarios
      const nuevaReserva: Reservas = {
        reservaId: null, // Omitir reservaId si es autogenerado en el backend
        horarioInicio: horarioInicio,
        horarioFin: horarioFin,
        canchaNombre: canchaNombre,
        bebidaId: null,
        cantidadBebidas: null,
        precioTotal: precioCancha,
        email: 'prueba@gmail.com'
      };

      // Imprimir los datos de la reserva en la consola
      console.log('Datos de la reserva:', nuevaReserva);

      // Llamar al servicio para agregar la reserva
      this.reservasService.agregarReserva(nuevaReserva).subscribe(
        (response) => {
          console.log('Reserva guardada exitosamente:', response);
          // Establecer reservaGuardada en true para mostrar la alerta
          this.reservaGuardada = true;

          // Actualizar la página después de 2 segundos (2000 milisegundos)
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          console.error('Error al guardar la reserva:', error);
          // Manejar el error adecuadamente
        }
      );
    }
  }

  guardarBebida() {
    console.log('Reserv', this.reservarBebidas);
    console.log(this.selectedEntry);
    console.log('Bebi', this.bebidaSeleccionada);


    if (this.reservarBebidas && this.selectedEntry && this.bebidaSeleccionada) {
      const { horarioInicio, horarioFin, canchaNombre, precioCancha } = this.selectedEntry;

      // Corrige la línea para obtener el precio de la cancha desde selectedEntry
      const precioTotal = (Number(this.bebidaSeleccionada.precioBebida) * this.cantidad) + Number(precioCancha);
      console.log(precioTotal);
      const nuevaReserva: Reservas = {
        reservaId: null,
        horarioInicio: horarioInicio,
        horarioFin: horarioFin,
        canchaNombre: canchaNombre,
        bebidaId: this.bebidaSeleccionada.bebidaId,
        cantidadBebidas: this.cantidad,
        precioTotal: precioTotal, // Utiliza el precio calculado
        email: 'prueba@gmail.com'
      };
      console.log(nuevaReserva);

      // Llama al servicio para agregar la reserva
      this.reservasService.agregarReserva(nuevaReserva).subscribe(
        (response) => {
          console.log('Reserva guardada exitosamente:', response);
          // Mostrar la alerta de reserva guardada exitosamente
          this.reservaGuardada2 = true;
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          console.error('Error al guardar la reserva:', error);
          // Manejar el error adecuadamente
        }
      );
    }
  }

}
