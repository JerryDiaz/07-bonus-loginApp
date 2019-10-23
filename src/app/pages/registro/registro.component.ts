import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  Usuario:  UsuarioModel = new UsuarioModel();
  recordar: boolean = false;
  constructor( private auth:AuthService, protected router:Router) { }

  ngOnInit() { 
  }

  onSubmit( form: NgForm ){

    if(form.invalid){return;}


    Swal.fire({
      allowOutsideClick:false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    
      this.auth.nuevoUsuario(this.Usuario)
           .subscribe( resp => {
               console.log(resp);
               Swal.close();
              
               if(this.recordar){
                localStorage.setItem('email',this.Usuario.email);
              }

              this.router.navigateByUrl('/home');

           },(err) => {
            Swal.fire({
              type: 'error',
              title: 'Error al autenticar',
              text: err.error.error.message
            });
           } );

  }


}
