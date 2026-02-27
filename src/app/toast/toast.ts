import { Component, inject, input, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';

const TOAST_LIFE = 3000;

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {

}
