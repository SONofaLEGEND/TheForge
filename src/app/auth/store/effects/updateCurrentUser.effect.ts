import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { switchMap, map, catchError, of, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/types/services/persistance.service";
import { AuthService } from "../../services/auth.service";
import { updateCurrentUserAction, updateCurrentUserFailureAction, updateCurrentUserSuccessAction } from "../actions/updateCurrentUser.action";

@Injectable()
export class UpdateCurrentUserEffect { 
    updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(updateCurrentUserAction),
        switchMap(({currentUserInput}) => {
            return this.authService.updateCurrentUser(currentUserInput).pipe(
                map((currentUser:CurrentUserInterface) => {
                    return updateCurrentUserSuccessAction({currentUser})
                }),

                catchError((errorResponse: HttpErrorResponse) => {
                    return of(updateCurrentUserFailureAction(
                        {errors:errorResponse.error.errors}
                    ))
                })
            )
        })
        )
    )

    redirectAfterSubmit$ = createEffect(
        () => 
        this.actions$.pipe(
            ofType(updateCurrentUserSuccessAction),
            tap(() => {
                console.log('1');
                this.router.navigate(['/']);
            })
        ),
          {dispatch: false}
    )
    constructor(private actions$:Actions, private router:Router,private authService:AuthService){}
}