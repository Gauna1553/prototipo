import { Component } from '@angular/core';
import { DatoUsuarios } from 'src/app/model/usuarios';
import { DatosService } from 'src/app/shared/services/datos.service';
import { Input } from '@angular/core';

interface Gens {
  name: string,
  code : string,
}

@Component({
  selector: 'app-calculadora-cal',
  templateUrl: './calculadora-cal.component.html',
  styleUrls: ['./calculadora-cal.component.css']
})

export class CalculadoraCALComponent {

  @Input()imc:number=0;

  constructor (public servicioDatos: DatosService) {}

  //Defino la visibilidad del pop up
  datosDialog: boolean = false

  generos: Gens[] | undefined;

  gensSelected: Gens | undefined;

  database = '';

  submitted: any;

  datosColeccion: DatoUsuarios[] = [];

  datosSeleccionado!: DatoUsuarios;

  loading = false;

  datoss: DatoUsuarios = {
    sexo: '',
    altura: 0,
    peso: 0,
    edad: 0,
    imc: 0,
    uid: '',
  }

  //Esta función se encarga de abrir el pop up
  openNew() {
    this.submitted = false;
    this.datosDialog = true;
  }

  //Esta función se encarga de cerrar el pop up
  hideDialog() {
    this.datosDialog = false;
    this.datoss.altura = 0;
    this.datoss.peso = 0;
    this.datoss.sexo = '';
    this.datoss.edad = 0;
  }

  //Esta función se encarga de guardar los nuevos datos para que luego se puedan modificar
  async guardarDatos(){
    this.servicioDatos.agregarDatos(this.datoss.uid, this.datoss.altura, this.datoss.sexo, this.datoss.edad, this.datoss.peso)
    .then(res =>{
      console.log(this.datoss,res);
    })
    .catch(error =>{
      console.log('Error',error)
    })
  }

  //Editar datos -> se llama al boton para el pop up
  editarDatos(datosSeleccionado:DatoUsuarios) {
    this.datosSeleccionado = datosSeleccionado;
  }

  edtiDatos() {
    let datos: DatoUsuarios = {
      uid: this.datoss.uid,
      edad: this.datoss.edad,
      altura: this.datoss.altura,
      peso: this.datoss.peso,
      sexo: this.datoss.sexo,
      imc: this.datoss.imc
    }

    this.servicioDatos.modificarDatos(this.datosSeleccionado.uid, datos)
    .then(datos => {
      alert ("Los datos fueron modificados con exito")
    })
    .catch (error => {
      alert ("No se pudieron modificar los datos"+error)
    })
    
  /*
  Esta funcion toma los valores asignados de la colección de usuarios, y los modifica, excepto el valor ID.
  En caso de hacerlo bien, se muestra el primer mensaje, en caso contrario, muestra el segundo mensaje
  */
  }

  mostrarBorrar(datosSeleccionado: DatoUsuarios) {
    this.datosSeleccionado = datosSeleccionado;
    if(confirm("Desea eliminar los datos subidos") === true) {
      this.borrarDatos()
    } else {
      alert ("No se pudieron borrar los datos")
    }
  }

  borrarDatos() {
    this.servicioDatos.eliminarDatos(this.datosSeleccionado.uid)
    .then(respuesta => {
      alert("Los datos se borraron de forma correcta")
    })
    .catch (error => {
      alert("No se pudo borrar los datos"+ error)
    })
  }


  async calcular() {
    try {
        const result = this.servicioDatos.guardarIMC(this.datoss.uid, this.datoss.edad, this.datoss.sexo, this.datoss.altura, this.datoss.peso, this.datoss.imc);
        console.log(result)
      
    } catch (error) {
        console.error('Error al guardar el IMC:', error);
    }

    //Esta función se encarga de calcular tu indice de masa corporal para que el usuario sepa su rango
}

}
