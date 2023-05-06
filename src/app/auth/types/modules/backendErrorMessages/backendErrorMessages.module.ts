import { CommonModule } from "@angular/common";
import { Input, NgModule } from "@angular/core";
import { BackendErrorsInterface } from "../../../../shared/types/backendErrors.interface";
import { BackendErrorMessagesComponent } from './components/backend-error-messages/backend-error-messages.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      BackendErrorMessagesComponent
    ],
    exports: [BackendErrorMessagesComponent]
})

export class BackendErrorMessagesModule{
   
}