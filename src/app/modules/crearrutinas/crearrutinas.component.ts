import { Component } from '@angular/core';
import { Rutina } from 'src/app/model/rutinas';
import { RutinasService } from 'src/app/services/rutinas.service';

@Component({
  selector: 'app-crearrutinas',
  templateUrl: './crearrutinas.component.html',
  styleUrls: ['./crearrutinas.component.css']
})
export class CrearrutinasComponent {
  visible = true;
  ejerciciosDialog = false
  rutinas = ['Pecho', 'Espalda', 'Piernas']
  constructor(public servicioRutinas: RutinasService){}

  rutina: Rutina = {
    idRutina: '',
    nombre: '',
    ejercicios: []
  }

  openNew(){
    this.ejerciciosDialog = true
  }
}
