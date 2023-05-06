import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PersistanceService } from "../shared/types/services/persistance.service";
import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "./services/auth.service";
import { LoginEffect } from "./store/effects/login.effects";
import { RegisterEffect } from "./store/effects/register.effect";
import { reducers } from "./store/reducers";
import { BackendErrorMessagesModule } from "./types/modules/backendErrorMessages/backendErrorMessages.module";
import { LoginComponent } from './components/login/login.component';
import { GetCurrentUserEffect } from "./store/effects/getCurrentUser.effect";
import { UpdateCurrentUserEffect } from "./store/effects/updateCurrentUser.effect";
import { LogoutEffect } from "./store/effects/logout.effect";

const routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
]
@NgModule ({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        BackendErrorMessagesModule,
        EffectsModule.forFeature([
            RegisterEffect, 
            LoginEffect, 
            GetCurrentUserEffect,
            UpdateCurrentUserEffect,
            LogoutEffect]),
        StoreModule.forFeature('auth', reducers)
    ],
    declarations: [RegisterComponent, LoginComponent],
    providers: [AuthService, PersistanceService]
})
 
export class AuthModule{}