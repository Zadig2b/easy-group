import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  text: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageSubject = new BehaviorSubject<ToastMessage | null>(null);
  message$ = this.messageSubject.asObservable();

  show(text: string, type: ToastType = 'info') {
    this.messageSubject.next({ text, type });
    setTimeout(() => this.clear(), 5000);
  }

  clear() {
    this.messageSubject.next(null);
  }
}
