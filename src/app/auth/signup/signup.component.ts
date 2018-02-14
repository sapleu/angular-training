import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private loadingSubscription: Subscription;
  maxDate: Date;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription)
      this.loadingSubscription.unsubscribe();
  }

  onSubmit(signupForm: NgForm) {
    this.authService.registerUser({
      email: signupForm.value.email,
      password: signupForm.value.password
    });
  }
}
