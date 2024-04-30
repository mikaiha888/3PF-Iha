import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '05-2PF-Iha';

  isLogged: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._auth.authUser$.subscribe(user => {
      this.isLogged = !!user;
      if (!this.isLogged) this._router.navigate(['auth',])
    });
  }
}
