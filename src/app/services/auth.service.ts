import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBgQ4p0xwE2a4JFa-1gfuewXwcICnT1ET0 ';
  userToken:string;

  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http:HttpClient) { 

    this.leerToken();

  }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){

    const autData = {
      ...usuario,
       returnSecureToken: true
     };

     
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      autData
      ).pipe(
        map( resp=> {
          this.guardarToken(resp['idToken']);
          return resp;
        } )
      );
  }

  nuevoUsuario(usuario: UsuarioModel){
      const autData = {
       ...usuario,
        returnSecureToken: true
      };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      autData
      ).pipe(
        map( resp=> {
          this.guardarToken(resp['idToken']);
          return resp;
        } )
      );

  }

  private guardarToken(idToken:string){

    this.userToken = idToken;
    localStorage.setItem('token',idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken =localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado():boolean{
    return this.userToken.length > 2;
  }


} 
