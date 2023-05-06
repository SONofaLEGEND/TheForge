import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { switchMap, map, catchError, of, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/types/services/persistance.service";
import { AuthService } from "../../services/auth.service";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.action";

@Injectable()
export class LoginEffect { 
    login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loginAction),
        switchMap(({request}) => {
            return this.authService.login(request).pipe(
                map((currentUser:CurrentUserInterface) => {
                    //this.persistanceService.set(currentUser.token);
                    console.log(currentUser);

                    return loginSuccessAction({currentUser})
                }),

                catchError((errorResponse: HttpErrorResponse) => {
                    return of(loginFailureAction(
                        {errors:errorResponse.error.message}
                    ))
                })
            )
        })
        )
    )

    redirectAfterSubmit$ = createEffect(
        () => 
        this.actions$.pipe(
            ofType(loginSuccessAction),
            tap(() => {
                console.log('1');
                this.router.navigate(['/']);
            })
        ),
          {dispatch: false}
    )
    constructor(private actions$:Actions, private router:Router,private authService:AuthService, private persistanceService:PersistanceService){}
}