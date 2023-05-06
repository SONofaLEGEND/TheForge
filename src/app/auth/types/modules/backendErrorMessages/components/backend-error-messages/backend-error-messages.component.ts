import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.css']
})
export class BackendErrorMessagesComponent implements OnInit{
  @Input('backendErrors')
  backendErrorsProps!: BackendErrorsInterface;

  
  ngOnInit(): void {
    
  }

  

}
