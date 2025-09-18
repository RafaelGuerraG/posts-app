import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';
export interface Toast { id: number; type: ToastType; message: string; timeout: number; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _events = new Subject<Toast>();
  private _id = 0;
  get events$(): Observable<Toast> { return this._events.asObservable(); }

  show(message: string, type: ToastType = 'info', timeout = 3000) {
    this._events.next({ id: ++this._id, type, message, timeout });
  }
  success(msg: string, t = 2500) { this.show(msg, 'success', t); }
  error(msg: string, t = 3500) { this.show(msg, 'error', t); }
  info(msg: string, t = 3000) { this.show(msg, 'info', t); }
}
