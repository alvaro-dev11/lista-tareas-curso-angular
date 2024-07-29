import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  listaTareas: string[] = [];
  nuevaTarea: string = '';

  // injección de dependencias
  private _tareasService = inject(TareasService);

  ngOnInit(): void {
    this.listaTareas = this._tareasService.getTareas();
  }

  eliminarTarea(index: number) {
    // eliminar tarea por medio de su indice
    this._tareasService.deleteTarea(index);
    // llamar a la lista de tareas
    this.listaTareas = this._tareasService.getTareas();
  }

  addTarea() {
    // guardar tarea en db o local
    this._tareasService.storeTarea(this.nuevaTarea);
    // resetear input
    this.nuevaTarea = '';
    // llamar a la lista de tareas
    this.listaTareas = this._tareasService.getTareas();
  }
}
