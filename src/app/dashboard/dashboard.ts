import { Component, ElementRef, AfterViewInit, OnDestroy, Renderer2, inject } from '@angular/core'; // Adicionado 'OnDestroy'
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  // Adicionado 'OnDestroy' aqui
  private currentIndex = 0;
  isSidebarOpen = false;
  private autoPlayTimer: any; // Guarda o temporizador do carrossel

  private router = inject(Router);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  constructor() {}

  logout() {
      this.stopAutoPlay(); 
    this.router.navigate(['/']);
  }

  ngAfterViewInit() {
    const container = this.el.nativeElement.querySelector('.carousel-container');
    if (container) {
      this.renderer.listen(container, 'changeSlide', (event: CustomEvent) => {
        this.moveSlide(event.detail);
        this.resetAutoPlay(); // Reinicia o tempo se o usuário clicar manualmente
      });
    }

    // Inicia o carrossel automático ao carregar a página
    this.startAutoPlay();
  }

  // Executado automaticamente quando o usuário sai da página
  ngOnDestroy() {
    this.stopAutoPlay();
  }

  // Função que inicia a contagem de 10 segundos
  private startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.moveSlide(1); // Passa para a próxima imagem
    }, 10000); // 10000 milissegundos = 10 segundos
  }

  // Para o temporizador atual
  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  // Reseta o tempo caso o usuário clique nas setas antes dos 10 segundos
  private resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  private moveSlide(direction: number) {
    const items = this.el.nativeElement.querySelectorAll('.carousel-item');
    if (!items.length) return;

    this.renderer.removeClass(items[this.currentIndex], 'active');
    this.currentIndex += direction;

    if (this.currentIndex >= items.length) this.currentIndex = 0;
    if (this.currentIndex < 0) this.currentIndex = items.length - 1;

    this.renderer.addClass(items[this.currentIndex], 'active');
  }
}
