// // meu-componente.component.ts
// import { Component, OnInit, inject } from '@angular/core';
// import { ApiService } from '../services/api';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms'; // Necessário se for um componente Standalone
// import { CommonModule } from '@angular/common'; // Necessário para usar o *ngIf

// @Component({
//   selector: 'app-login',
//   standalone: true, // Remova essa linha se o seu projeto usar o padrão antigo de AppModules
//   imports: [FormsModule, CommonModule], // Remova essa linha se o seu projeto usar AppModules
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'], // Certifique-off se o seu arquivo de estilo chama login.css
// })
// export class LoginComponent {
//   // Propriedades vinculadas ao formulário usando [(ngModel)]
//   usuario = '';
//   senha = '';
//   erroMensagem = '';

//   constructor(private router: Router) {}

//   // Função que o formulário chama ao ser enviado pelo (ngSubmit)
//   onSubmit(): void {
//     // Validação mockada com os dados solicitados pelo enunciado: admin / 123456
//     if (this.usuario === 'admin' && this.senha === '123456') {
//       this.erroMensagem = '';
//       localStorage.setItem('isLoggedIn', 'true');

//       // Redireciona para a próxima rota (mude para o nome correto da sua rota do dashboard se necessário)
//       this.router.navigate(['/home']);
//     } else {
//       this.erroMensagem = 'Usuário ou senha inválidos.';
//     }
//   }
// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  usuario = '';
  senha = '';
  erroMensagem = '';
  carregando = false;

  private router = inject(Router);

  onLogin(): void {
    if (this.usuario === 'admin' && this.senha === '123456') {
      this.erroMensagem = '';
      this.carregando = false;
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
      return;
    }

    this.erroMensagem = 'Usuário ou senha inválidos.';
  }
}
