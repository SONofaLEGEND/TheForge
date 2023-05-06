import { Injectable } from "@angular/core";

@Injectable()

export class UtilService {
    
    range(start:number, end:number):number[]{
        if (end > Number.MAX_SAFE_INTEGER) {
            throw new RangeError(`Invalid array length: ${end}`);
        }
        return [...Array(end).keys()].map(el => el + start)
    }
}