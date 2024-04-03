import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Court {
  id: number;
  canchaNombre: string;
  horarioInicio: string;
  horarioFin: string;
  precioCancha: string;
  estado: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
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

  constructor(private http: HttpClient) {
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
            this.filterCourtEntriesByDate(response.data, formattedDate);
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
    } else {
      // Si es una nueva entrada, seleccionarla
      this.selectedEntry = entry;
      console.log('Horario seleccionado:', entry);
    }
  }

  cancelarSeleccion() {
    this.selectedEntry = null; // Limpiar la entrada seleccionada
  }


}
