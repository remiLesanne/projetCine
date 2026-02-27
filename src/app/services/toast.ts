import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { typeToast } from '../models/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messageService = inject(MessageService);

  show(severity: typeToast | "error", message: string) {
    this.messageService.add({
      severity,
      summary: severity.toUpperCase(),
      detail: message,
      life: 3000,
      styleClass: 'toast-timer'
    });
  }

  ok(message: string, title?: string) {
    this.messageService.add({
      severity: "success",
      summary: title ?? "Success",
      detail: message,
      life: 3000,
      styleClass: 'toast-timer'
    });
  }

  warn(message: string, title?: string) {
    this.messageService.add({
      severity: "warn",
      summary: title ?? "Warning",
      detail: message,
      life: 3000,
      styleClass: 'toast-timer'
    });
  }

  err(message: string, title?: string) {
    this.messageService.add({
      severity: "error",
      summary: title ?? "Error",
      detail: message,
      life: 3000,
      styleClass: 'toast-timer'
    });
  }

  info(message: string, title?: string) {
    this.messageService.add({
      severity: "info",
      summary: title ?? "Information",
      detail: message,
      life: 3000,
      styleClass: 'toast-timer'
    });
  }

  sec( message: string, title?: string) {
    this.messageService.add({
      severity: "secondary",
      summary: title ?? "Secondary",
      detail: message,
      life: 3000,
      styleClass: 'toast-timer'
    });
  }

  contrast(message: string, title?: string) {
    this.messageService.add({
      severity: "contrast",
      summary: title ?? "Contrast",
      detail: message,
      life: 3000,
      styleClass: 'toast-timer'
    });
  }
}
