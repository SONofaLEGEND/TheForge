import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { PersistanceService } from "src/app/shared/types/services/persistance.service";
import { logoutAction } from "../actions/sync.action";

@Injectable() 
export class LogoutEffect {
     logout$ = createEffect(
        () =>
        this.action$.pipe(
            ofType(logoutAction),
            tap(() => {
                this.persistanceService.set('')
                this.router.navigateByUrl('/')
            })
        ),
        {dispatch:false}
     )

     constructor(
        private action$:Actions,
        private persistanceService:PersistanceService,
        private router:Router
     ){}
}