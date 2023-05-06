import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector, isAnonymousSelector, isLoggedInSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$:Observable<boolean>;
  isAnonymous$:Observable<boolean>;
  currentUser$:Observable<CurrentUserInterface | null>;

  constructor(private store:Store){}


  @Input() showSideNav: boolean = true;
  isNavbarWidth16 = true;

  toggleNavbarWidth() {
    this.isNavbarWidth16 = !this.isNavbarWidth16;
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }
}
