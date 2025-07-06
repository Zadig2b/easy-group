import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
})
export class ToastMessageComponent {
  message: ToastMessage | null = null;
  toastClass = 'bg-info';

  constructor(public toastService: ToastService) {
    toastService.message$.subscribe((msg) => {
      this.message = msg;
      this.toastClass = this.getClass(msg?.type || 'info');
    });
  }

  private getClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      case 'info':
      default:
        return 'bg-info';
    }
  }
}
