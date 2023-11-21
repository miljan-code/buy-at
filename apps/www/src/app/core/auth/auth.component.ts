import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

import { AuthService } from '~core/services/auth.service';
import { LocalService } from '~core/services/local.service';
import { onDestroy } from '~shared/utils/destroy';
import type { User } from '~core/models/user.model';
import type { Error } from '~core/models/error.model';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

interface RegisterForm extends LoginForm {
  username: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    DialogModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  dialogVisible = false;
  loginForm!: FormGroup<LoginForm>;
  registerForm!: FormGroup<RegisterForm>;
  private destroy$ = onDestroy();

  constructor(
    private readonly authService: AuthService,
    private readonly localService: LocalService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) this.router.navigateByUrl('');
      });

    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.registerForm = new FormGroup<RegisterForm>({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  signIn(): void {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;
    this.authService
      .login(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => this.saveUserAndNavigateTo(user),
        error: ({ errorName, message }: Error) => {
          if (errorName === 'wrongEmail') {
            this.loginForm.get('email')?.setErrors({ [errorName]: message });
          }
          if (errorName === 'wrongPassword') {
            this.loginForm.get('password')?.setErrors({ [errorName]: message });
          }
        },
      });
  }

  signUp(): void {
    const { username, email, password } = this.registerForm.value;
    if (!username || !email || !password) return;
    this.authService
      .register(username, email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => this.saveUserAndNavigateTo(user));
  }

  handleDialog(): void {
    this.dialogVisible = !this.dialogVisible;
  }

  private saveUserAndNavigateTo(user: User, path: string = '') {
    this.authService.currentUser.next(user);
    this.localService.save(this.localService.userKey, user);
    this.router.navigateByUrl(path);
  }
}
