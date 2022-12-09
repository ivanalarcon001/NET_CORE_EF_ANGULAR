import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})

export class LibroComponent implements OnInit {
  listLibros: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  numeroIntentos: number = 0; 
  numeroMaximoPermitidos: number = 2;
  listAutores: any[] = [];

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private libroService: LibroService,
    private autorService: AutorService) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      anio: ['', [Validators.required, Validators.max(3000), Validators.min(1900)]],
      genero: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      numeroPaginas: ['', [Validators.required, Validators.max(10000), Validators.min(1)]],
      autorId: [''],
    })
   }

  ngOnInit(): void {
    this.obtenerLibros();
    this.obtenerAutores();
  }

  obtenerLibros() {
    this.libroService.obtenerLibros().subscribe(data => {
      this.listLibros = data;        
    }, error => {
      console.log(error);
    })
  }

  guardarLibro() {
    const libro: any = {
      Titulo: this.form.get('titulo')?.value,
      Anio: this.form.get('anio')?.value.toString(),
      Genero: this.form.get('genero')?.value,
      NumeroPaginas: Number(this.form.get('numeroPaginas')?.value),
      AutorId: Number(this.form.get('autorId')?.value),
    }
    var cantidadLibrosAutor = this.listLibros.filter(function(element){
      return element.autorId == libro.AutorId;
    }).length;    

    if(cantidadLibrosAutor >= this.numeroMaximoPermitidos){
      this.toastr.error('No es posible registrar el libro, se alcanzó el máximo permitido (' + this.numeroMaximoPermitidos+')','Error');      
    }else{
      var autorExiste = this.listAutores.filter(function(element){
        return element.autorId == libro.AutorId;
      }).length;
      
      if(autorExiste > 0){
        // if(this.id == undefined) {
          this.libroService.guardarLibro(libro).subscribe(data => {
            this.toastr.success('El libro fue registrado con exito!', 'Libro Registrado');
            this.obtenerLibros();
            this.form.reset();
            this.numeroIntentos++; 
            this.obtenerAutores();
          }, error => {
            this.toastr.error('Opss.. ocurrio un error','Error');
            console.log(error);
          })
        // }else {
          //   libro.id = this.id;
          //   this.libroService.actualizarLibro(this.id,libro).subscribe(data => {
          //     this.form.reset();
          //     this.accion = 'Agregar';
          //     this.id = undefined;
          //     this.toastr.info('La libro fue actualizada con exito!', 'Libro Actualizada');
          //     this.obtenerLibros();
          //   }, error => {
          //     console.log(error);
          //   })
        // }                 
      }else{
        this.toastr.error('El autor no está registrado','Error');   
      }
    }    
  }

  obtenerAutores() {
    this.autorService.obtenerAutores().subscribe(data => {
      this.listAutores = data;
    }, error => {
      console.log(error);
    })
  }
  // eliminarLibro(id: number) {
  //   this.libroService.eliminarLibro(id).subscribe(data => {
  //     this.toastr.error('La libro fue eliminada con exito!','Libro eliminada');
  //     this.obtenerLibros();
  //   }, error => {
  //     console.log(error);
  //   })

  // }

  // editarLibro(libro: any) {
  //   this.accion = 'Editar';
  //   this.id = libro.id;

  //   this.form.patchValue({
  //     titular: libro.titular,
  //     numeroTarjeta: libro.numeroTarjeta,
  //     fechaExpiracion: libro.fechaExpiracion,
  //     cvv: libro.cvv
  //   })
  // }

}

