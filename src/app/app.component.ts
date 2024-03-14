import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoginComponent, RouterLink, CommonModule]
})
export class AppComponent implements OnInit{
  authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSignal.set(null);
      }
      console.log(this.authService.currentUserSignal());
    });
  }
  logout(): void {
    console.log('logout');
  }
}
