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

import { AuthService } from '../services/auth.service';
import { LocalService } from '../services/local.service';
import type { User } from '../models/user.model';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
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
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;
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
  }

  signIn(): void {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;
    this.authService
      .login(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.status === 'fail') {
          // handle Wrong Email and PW
          return;
        }
        this.saveUserAndNavigateTo(res.data);
      });
  }

  private saveUserAndNavigateTo(user: User, path: string = '') {
    this.authService.currentUser.next(user);
    this.localService.save(this.localService.userKey, user);
    this.router.navigateByUrl(path);
  }
}
