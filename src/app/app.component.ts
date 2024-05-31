import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  displayNavBar: boolean = false;

  constructor(private _router: Router) {
    this._router.events.subscribe(() => {
      this.displayNavBar = !this._router.url.includes('/auth')
    });
  }
}
