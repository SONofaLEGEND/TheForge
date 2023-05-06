import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { switchMap, map, catchError, of, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/types/services/persistance.service";
import { AuthService } from "../../services/auth.service";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() =>
    this.actions$.pipe(
        ofType(registerAction),
        switchMap(({request}) => {
            return this.authService.register(request).pipe(
                map((currentUser:CurrentUserInterface) => {
                    //this.persistanceService.set(currentUser.token);
                    //console.log(currentUser.token);
                    return registerSuccessAction({currentUser})
                }),

                catchError((errorResponse: HttpErrorResponse) => {
                    return of(registerFailureAction(
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
            ofType(registerSuccessAction),
            tap(() => {
                console.log('1');
                this.router.navigateByUrl('/');
            })
        ),
          {dispatch: false}
    )
    constructor(private actions$:Actions, private router:Router,private authService:AuthService, private persistanceService:PersistanceService){}
}