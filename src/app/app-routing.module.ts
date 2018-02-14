import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component'; 
import { AuthGuard } from './auth/auth.guard';

const ROUTES: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
