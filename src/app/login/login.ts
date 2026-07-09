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
      localStorage.setItem('usuario', 'true');
      this.router.navigate(['/home']);
      return;
    }

    this.erroMensagem = 'Usuário ou senha inválidos.';
  }
}
