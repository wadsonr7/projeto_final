import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


export interface Usuario {

  id:number;

  nome:string;

  email:string;

}


@Injectable({

  providedIn:'root'

})

export class AuthService {


  private apiUrl = 'http://localhost:3001';


  constructor(

    private http:HttpClient,

    private router:Router

  ){}



  login(

    nome:string,

    senha:string

  ):Observable<Usuario>{


    return this.http.post<Usuario>(

      `${this.apiUrl}/login`,

      {

        nome,

        senha

      }

    );

  }




  salvarUsuario(

    usuario:Usuario

  ):void{


    localStorage.setItem(

      'usuario',

      JSON.stringify(usuario)

    );

  }




  isAutenticado():boolean{


    return !!localStorage.getItem(

      'usuario'

    );

  }




  logout():void{


    localStorage.removeItem(

      'usuario'

    );


    this.router.navigate(

      ['/login']

    );

  }


}