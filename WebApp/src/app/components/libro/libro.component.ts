import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';

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

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private libroService: LibroService) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      anio: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      genero: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      numeroPaginas: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      autorId: ['', [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this.libroService.obtenerLibros().subscribe(data => {
      console.log(data);
      this.listLibros = data;
    }, error => {
      console.log(error);
    })
  }

  guardarLibro() {
    const libro: any = {
      Titulo: this.form.get('titulo')?.value,
      Anio: this.form.get('anio')?.value,
      Genero: this.form.get('genero')?.value,
      NumeroPaginas: Number(this.form.get('numeroPaginas')?.value),
      AutorId: Number(this.form.get('autorId')?.value),
    }

    // if(this.id == undefined) {
        this.libroService.guardarLibro(libro).subscribe(data => {
          debugger
          this.toastr.success('El libro fue registrado con exito!', 'Libro Registrado');
          this.obtenerLibros();
          this.form.reset();
        }, error => {
          this.toastr.error('Opss.. ocurrio un error','Error')
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

