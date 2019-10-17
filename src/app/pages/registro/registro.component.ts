import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  Usuario:  UsuarioModel = new UsuarioModel();;
  constructor() { }

  ngOnInit() { 
  }

  onSubmit( form: NgForm ){

    if(form.invalid){return;}

    console.log('Formulario');
    console.log(this.Usuario);
    console.log(form);
  }


}
