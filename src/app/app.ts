import { Component, signal } from '@angular/core';
import { Navbar } from './navbar/navbar';
import {Home} from './home/home';
import {RouterOutlet} from '@angular/router';
import { Toast } from './toast/toast';

@Component({
  selector: 'app-root',
  imports: [Navbar, Home, RouterOutlet, Toast],    // j'ai supr RouterOutler
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App   {
  protected readonly title = signal('PUNCH CINEMA');
}
