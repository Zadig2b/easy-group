import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../core/services/toast.service';



@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="message"
      class="toast align-items-center text-white border-0 show position-fixed bottom-0 end-0 m-3"
      [ngClass]="toastClass"
      role="alert"
    >
      <div class="d-flex">
        <div class="toast-body">{{ message.text }}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" (click)="toastService.clear()"></button>
      </div>
    </div>
  `
})
export class ToastMessageComponent {
  message: ToastMessage | null = null;
  toastClass = 'bg-info';

  constructor(public toastService: ToastService) {
    toastService.message$.subscribe(msg => {
      this.message = msg;
      this.toastClass = this.getClass(msg?.type || 'info');
    });
  }

  private getClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-success';
      case 'error': return 'bg-danger';
      case 'info': default: return 'bg-info';
    }
  }
}
