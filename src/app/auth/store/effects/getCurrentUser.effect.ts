import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { switchMap, map, catchError, of, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/types/services/persistance.service";
import { AuthService } from "../../services/auth.service";
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from "../actions/getCurrentUser.action";

@Injectable()
export class GetCurrentUserEffect { 
    getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
            const token = this.persistanceService.get();
            console.log(token);
            if(!token) {
                return of(getCurrentUserFailureAction())
            }

            return this.authService.getCurrentUser().pipe(
                map((currentUser:CurrentUserInterface) => {
                    //this.persistanceService.set(currentUser.token);
                    console.log(currentUser);
                    return getCurrentUserSuccessAction({currentUser})
                }),

                catchError((errorResponse: HttpErrorResponse) => {
                    return of(getCurrentUserFailureAction(
                        
                    ))
                })
            )
        })
        )
    )

    
    constructor(private actions$:Actions, private router:Router,private authService:AuthService, private persistanceService:PersistanceService){}
}