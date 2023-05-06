import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import { loginAction } from '../../store/actions/login.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    private store:Store
    ){}
  loginForm!: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
     
      
      
     });
  }
  initializeValues() : void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log(this.isSubmitting$);
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  async onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);

    if(this.loginForm.invalid){
      console.log(this.loginForm.value, "invalid");
      return}

    else{
      console.log(this.loginForm.value);
      const request:LoginRequestInterface = this.loginForm.value;
      this.store.dispatch(loginAction({request}))
    }
  }
}
  /*form!: FormGroup;
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
      
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    console.log('submitted');
    const request:LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
    
  }*/