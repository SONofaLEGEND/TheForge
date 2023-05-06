import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map, Observable, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { environment } from "src/environments/environment";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { CurrentUserInputInterface } from "src/app/shared/types/currentUserInput.interface";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthService {
    constructor(private http:HttpClient, private cookieService:CookieService) {}
    getUser(response: AuthResponseInterface): CurrentUserInterface {
        return response.user;
    }

    

    register(data:RegisterRequestInterface):
    Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/auth/register'
        return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(
            tap(response => {
                const token = response.token;
                this.cookieService.set('token', token, 7)
            }),
            map(this.getUser)
        )
    }
    
    login(data: LoginRequestInterface) :
    Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/auth/login'
        return this.http 
        .post<AuthResponseInterface>(url, data)
        .pipe(
            tap(response => {
                const token = response.token;
                this.cookieService.set('token', token, 7)
            }),
            map(this.getUser)
        )
    }

    getCurrentUser(): Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/auth/profile'
        return this.http.get<CurrentUserInterface>(url);
    }

    updateCurrentUser(data: CurrentUserInputInterface):Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/auth/update'
        return this.http.put<AuthResponseInterface>(url, {user:data})
        .pipe(map(this.getUser))
    }
}