import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toasts">
      <div class="toast" *ngFor="let t of toasts" [class.success]="t.type==='success'"
           [class.error]="t.type==='error'" [class.info]="t.type==='info'">
        {{ t.message }}
      </div>
    </div>
  `,
  styles: [`
    .toasts{ position:fixed; top:16px; right:16px; display:grid; gap:10px; z-index:9999; }
    .toast{
      padding:10px 12px; border-radius:10px; color:#0f172a; background:#fff;
      border:1px solid #e5e7eb; box-shadow: 0 10px 30px rgba(2,6,23,.08);
      animation: fadein .18s ease-out;
    }
    .toast.success{ background:#ecfdf5; border-color:#bbf7d0; color:#065f46; }
    .toast.error{ background:#fef2f2; border-color:#fecaca; color:#7f1d1d; }
    .toast.info{ background:#eff6ff; border-color:#bfdbfe; color:#1e3a8a; }
    @keyframes fadein { from{ opacity:0; transform: translateY(-4px); } to { opacity:1; transform:none; } }
  `]
})
export class ToastsContainerComponent implements OnDestroy {
  toasts: Toast[] = [];
  private sub: Subscription;

  constructor(private ts: ToastService) {
    this.sub = this.ts.events$.subscribe(t => {
      this.toasts = [t, ...this.toasts];
      setTimeout(() => this.toasts = this.toasts.filter(x => x.id !== t.id), t.timeout);
    });
  }
  ngOnDestroy(){ this.sub.unsubscribe(); }
}
