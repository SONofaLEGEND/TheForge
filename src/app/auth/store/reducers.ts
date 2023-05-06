import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from "./actions/getCurrentUser.action";
import { loginAction, loginFailureAction, loginSuccessAction } from "./actions/login.action";
import { registerAction, registerFailureAction, registerSuccessAction } from "./actions/register.action";
import { logoutAction } from "./actions/sync.action";
import { updateCurrentUserFailureAction, updateCurrentUserSuccessAction } from "./actions/updateCurrentUser.action";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
    isLoading: false
}

export const authReducer = createReducer(
    initialState, 
    on(
        registerAction, 
        (state):AuthStateInterface => ({
            ...state,
            validationErrors: null,
            isSubmitting: true
        }) 
    ),
    on(
        registerSuccessAction, 
        (state, action):AuthStateInterface => ({
            ...state,
            isLoggedIn: true,
            isSubmitting: false,
            currentUser: action.currentUser
        }) 
    ),
    on(
        registerFailureAction, 
        (state, action):AuthStateInterface => ({
            ...state,

            isSubmitting: false,
            validationErrors:action.errors
        }) 
    ),
    on(
        loginAction, 
        (state):AuthStateInterface => ({
            ...state,

            isSubmitting: false,
            validationErrors:null
        }) 
        
    ),
    on(
        loginSuccessAction, 
        (state, action):AuthStateInterface => ({
            ...state,
            isLoggedIn: true,
            isSubmitting: false,
            currentUser: action.currentUser
        }) 
    ),
    on(
        loginFailureAction, 
        (state, action):AuthStateInterface => ({
            ...state,

            isSubmitting: false,
            validationErrors:action.errors
        }) 
    ),
    on(
        getCurrentUserAction, 
        (state, action):AuthStateInterface => ({
            ...state,

           isLoading: true
        }) 
    ),
    on(
        getCurrentUserSuccessAction, 
        (state, action):AuthStateInterface => ({
            ...state,
            isLoggedIn: true,
           isLoading: true,
           currentUser: action.currentUser
        }) 
    ),
    on(
        getCurrentUserFailureAction, 
        (state, action):AuthStateInterface => ({
            ...state,
            isLoggedIn: false,
           isLoading: false,
           currentUser: null
        }) 
    ),
    on(
        updateCurrentUserSuccessAction, 
        (state, action):AuthStateInterface => ({
            ...state,
            
           currentUser: action.currentUser
        }) 
    ),
    on(
        logoutAction, 
        (state):AuthStateInterface => ({
            ...state,
            ...initialState,
            
           isLoggedIn: false
        }) 
    )
)

export function reducers(state: AuthStateInterface, action:Action){
    return authReducer(state, action)
}