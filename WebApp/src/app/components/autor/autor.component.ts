import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  listAutores: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private autorService: AutorService) {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      ciudadProcedencia: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      correoElectronico: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      fechaNacimiento: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    })
   }

  ngOnInit(): void {
    this.obtenerAutores();
  }

  obtenerAutores() {
    this.autorService.obtenerAutores().subscribe(data => {
      this.listAutores = data;
    }, error => {
      console.log(error);
    })
  }

  guardarAutor() {
    const autor: any = {
      NombreCompleto: this.form.get('nombreCompleto')?.value,
      FechaNacimiento: this.form.get('fechaNacimiento')?.value,
      CiudadProcedencia: this.form.get('ciudadProcedencia')?.value,
      CorreoElectronico: this.form.get('correoElectronico')?.value,
    }
    

    // if(this.id == undefined) {
      this.autorService.guardarAutor(autor).subscribe(data => {
        this.toastr.success('El autor fue registrado con exito!', 'Autor Registrado');
        this.obtenerAutores();
        this.form.reset();
      }, error => {
        this.toastr.error('Opss.. ocurrio un error','Error')
        console.log(error);
      })
    // }else {
      //   autor.id = this.id;
      //   this.autorService.actualizarAutor(this.id,autor).subscribe(data => {
      //     this.form.reset();
      //     this.accion = 'Agregar';
      //     this.id = undefined;
      //     this.toastr.info('El autor fue actualizado con exito!', 'Autor Actualizada');
      //     this.obtenerAutores();
      //   }, error => {
      //     console.log(error);
      //   })
    // }
  }

  // eliminarAutor(id: number) {
  //   this.autorService.deleteAutor(id).subscribe(data => {
  //     this.toastr.error('El autor fue eliminado con exito!','Autor eliminada');
  //     this.obtenerAutores();
  //   }, error => {
  //     console.log(error);
  //   })

  // }

  // editarAutor(autor: any) {
  //   this.accion = 'Editar';
  //   this.id = autor.id;

  //   this.form.patchValue({
  //     titular: autor.titular,
  //     numeroAutor: autor.numeroAutor,
  //     fechaExpiracion: autor.fechaExpiracion,
  //     cvv: autor.cvv
  //   })
  // }

}


