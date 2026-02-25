import {Component, input} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})

export class Navbar {
  title = input.required<string>();
  //@Input({ required: true }) title! : string
}
