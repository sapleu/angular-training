import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        AngularFireAuthModule
    ],
    exports: [
    ]
})
export class AuthModule { }