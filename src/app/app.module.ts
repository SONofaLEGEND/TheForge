import { NgModule, isDevMode } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { PersistanceService } from './shared/types/services/persistance.service';
import { AuthInterceptor } from './shared/types/services/authinterceptor';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { NavbarModule } from './shared/modules/navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { ForgeModule } from './forge/forge.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './shared/services/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    NavbarModule,
    HomeModule,
    ForgeModule,
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: !isDevMode(), 
      autoPause: true, 
      trace: false, 
      traceLimit: 75,
    }),
    EffectsModule.forRoot([]),

    StoreModule.forRoot({router:routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({}, {}),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard

  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
