import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    private store:Store
    ){}
  registerForm!: FormGroup;
  isSubmitting$!: Observable<boolean>; 
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  errorMessages:string;
  submitted:boolean = false;
  ngOnInit(): void {

    this.initializeForm();
    this.initializeValues();
    


  }
  
  initializeForm()
  {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      
      
     });
  }
  initializeValues() : void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log(this.isSubmitting$);
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  
  async onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid){return}

    else{
      console.log(this.registerForm.value);
      const request:RegisterRequestInterface = this.registerForm.value;
      this.store.dispatch(registerAction({request}))
    }
  }
 
  

}
/*
form!: FormGroup;
  isSubmitting$!: Observable<boolean>; 
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private authService:AuthService, private  store: Store) {}

  ngOnInit(){
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues() : void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log(this.isSubmitting$);
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  initializeForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    console.log('submitted');
    const request:RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
    
  }
*/