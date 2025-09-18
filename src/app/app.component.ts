import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastsContainerComponent } from './shared/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastsContainerComponent],
  template: `
    <nav class="topbar">
        <div class="container topbar__row">
      <a routerLink="/posts" routerLinkActive="active">Posts</a>
      <a class="right" routerLink="/posts/new" routerLinkActive="active">Crear</a>
          </div>
    </nav>
    <router-outlet></router-outlet>
        <app-toasts></app-toasts> 
  `,
  styles: [`
    .topbar { display:flex; gap:12px; padding:10px 16px; background:#111827; color:#fff; }
    .topbar a { color:#e5e7eb; text-decoration:none; }
    .topbar a.active { color:#fff; font-weight:600; }
    .topbar .right { margin-left:auto; }
  `]
})
export class AppComponent {}
