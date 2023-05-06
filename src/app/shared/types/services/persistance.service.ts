import { JsonPipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
@Injectable()
export class PersistanceService {
    constructor(private cookieService: CookieService) {}

    set(key:string):void {
        try {
            this.cookieService.set('token', key);
        } catch (e) {
            console.error('Error ', e);
        }
    }

    get():any {
        try {
            return this.cookieService.get('token');

        }catch (e) {
            console.error('Error', e);
            return null;
        }
    }
}