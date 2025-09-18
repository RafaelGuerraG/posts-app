import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `<div class="spinner" [style.width.px]="size" [style.height.px]="size"></div>`,
  styles: [`
    .spinner{
      border-radius:50%;
      border:3px solid rgba(0,0,0,.08);
      border-top-color: rgba(0,0,0,.45);
      animation: spin .8s linear infinite;
      margin: 8px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() size = 28;
}
