import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSignOut(){
    this.authService.signOut();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
