import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

import { AuthService } from '../services/auth.service';
import { LocalService } from '../services/local.service';
import type { User } from '../models/user.model';

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
  private destroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly localService: LocalService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
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
        next: (res) => {
          if (res.status === 'success') {
            this.saveUserAndNavigateTo(res.data);
            return;
          }
          if (res.data.errorName === 'wrongEmail') {
            this.loginForm
              .get('email')
              ?.setErrors({ [res.data.errorName]: res.data.message });
          }
          if (res.data.errorName === 'wrongPassword') {
            this.loginForm
              .get('password')
              ?.setErrors({ [res.data.errorName]: res.data.message });
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
      .subscribe((res) => {
        if (res.status === 'fail') return;
        this.saveUserAndNavigateTo(res.data);
      });
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
