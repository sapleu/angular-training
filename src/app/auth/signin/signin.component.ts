import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;

  isLoading: boolean = false;


  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) this.loadingSubscription.unsubscribe();
  }

  onSubmit(signinForm: NgForm) {
    this.authService.signIn({
      email: signinForm.value.email,
      password: signinForm.value.password
    });
  }
}
