import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  error!: string;
  isLoading!: boolean;

  passwordHidden = true;

  private authStoreSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authStoreSub = this.store.select('auth').subscribe((state) => {
      this.isLoading = state.loading;
      this.error = state.authError;
    });
  }

  ngOnDestroy() {
    this.authStoreSub.unsubscribe();
  }

  onSubmit(form: FormGroup) {
    if (form.status === 'INVALID' || !form.touched) return;

    this.store.dispatch(
      AuthActions.loginStart({
        email: form.value.email,
        password: form.value.password,
      })
    );
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onGoSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
